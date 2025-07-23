//package net.youssouf.backend.controllers;
//
//import com.meilisearch.sdk.Client;
//import com.meilisearch.sdk.Config;
//import com.meilisearch.sdk.Index;
//import com.meilisearch.sdk.SearchResult;  // <-- Import correct ici
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/products")
//@RequiredArgsConstructor
//public class ProductSearchController {
//
//    private final Client meiliClient = new Client(
//            new Config("http://localhost:7700", "masterKey")
//    );
//
//    @GetMapping("/search")
//    public SearchResult searchProducts(
//            @RequestParam(defaultValue = "") String query,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "8") int size,
//            @RequestParam(defaultValue = "") String sort
//    ) throws Exception {
//
//        Index index = meiliClient.index("products");
//
//        var searchParams = new com.meilisearch.sdk.SearchParams()
//                .setOffset(page * size)
//                .setLimit(size);
//
//        if (!sort.isEmpty()) {
//            switch (sort) {
//                case "priceLowHigh":
//                    searchParams.setSort(List.of("sellPrice:asc"));
//                    break;
//                case "priceHighLow":
//                    searchParams.setSort(List.of("sellPrice:desc"));
//                    break;
//                case "rating":
//                    searchParams.setSort(List.of("rating:desc"));
//                    break;
//            }
//        }
//
//        return index.search(query, searchParams);
//    }
//}
