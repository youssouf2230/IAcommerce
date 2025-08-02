'use server';

import { API_BASE_URL } from "@/lib/utils";
import axios from "axios";
import { revalidatePath } from "next/cache";

type UpdateStatusResponse = {
  message: string;
};

export async function updateStatus(
  orderId: number,
  status: string
): Promise<UpdateStatusResponse> {
  if (!orderId || !status) {
    return { message: "Missing orderId or status" };
  }

  try {
    const res = await axios.put(`${API_BASE_URL}/api/dashboard/orders/${orderId}/status`, {
      status: status.toUpperCase(),
    });

    if (res.status === 200) {
        console.log(res.data);
        revalidatePath("/dashboard/orders");
      return { message: "Status updated successfully" };
    } else {
      
      return { message: `Unexpected response status: ${res.status}` };
    }
  } catch (e) {
    console.error("Error updating order status:", e);
    return { message: "Failed to update status" };
  }
}
