'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitButton } from "@/components/shared/submit-button"

// ✅ Updated schema
const formSchema = z.object({
  contactPhone: z
    .string()
    .min(10, "Phone number is too short")
    .max(20, "Phone number is too long")
    .regex(/^\+?[0-9\s\-()]+$/, "Invalid phone number format"),
  deliveryInstructions: z.string().max(300).optional(),
  deliveryAddress: z
    .string()
    .min(10, "Address is too short")
    .max(500, "Address is too long"),
})

type AdditionalInfoFormValues = z.infer<typeof formSchema>

export function AdditionalInfoForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const form = useForm<AdditionalInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactPhone: "",
      deliveryInstructions: "",
      deliveryAddress: "",
    },
  })

  async function onSubmit(values: AdditionalInfoFormValues) {
    setIsSubmitting(true)
    setSuccessMessage("")

    try {
      // Simulate submission (e.g., API or checkout state)
      console.log("Submitted Data:", values)
      await new Promise((res) => setTimeout(res, 1500))
      setSuccessMessage("Information saved successfully.")
      form.reset(values)
    } catch (error) {
      console.error("Submission failed:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 max-w-xl mx-auto  "
      >
        {/* Contact Phone */}
        <FormField
          control={form.control}
          name="contactPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone <span className="text-muted-foreground">(required)</span></FormLabel>
              <FormControl>
                <Input placeholder="e.g., +1 555 123 4567" type="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Delivery Address */}
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Address <span className="text-muted-foreground">(required)</span></FormLabel>
              <FormControl>
                <Textarea placeholder="Street, city, postal code, country..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Delivery Instructions */}
        <FormField
          control={form.control}
          name="deliveryInstructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery Instructions <span className="text-muted-foreground">(optional)</span></FormLabel>
              <FormControl>
                <Textarea placeholder="e.g., Leave at the front desk, ring the bell, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
          <SubmitButton type="submit" disabled={isSubmitting} pending={isSubmitting}>
            Checkout
          </SubmitButton>

        {/* Optional success message */}
        {successMessage && (
          <p className="text-green-600 text-sm">{successMessage}</p>
        )}
      </form>
    </Form>
  )
}
