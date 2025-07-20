package net.youssouf.backend;

import net.youssouf.backend.entities.Category;
import net.youssouf.backend.entities.Product;
import net.youssouf.backend.entities.ProductColor;
import net.youssouf.backend.repositories.CategoryRepository;
import net.youssouf.backend.repositories.ProductColorRepository;
import net.youssouf.backend.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    @Bean
    CommandLineRunner initData(
            ProductRepository productRepo,
            CategoryRepository categoryRepo,
            ProductColorRepository productColorRepository
    ) {
        return args -> {
            // Create Categories
            Category smartphones = categoryRepo.save(new Category(null, "Smartphones"));
            Category laptops = categoryRepo.save(new Category(null, "Laptops"));
            Category audio = categoryRepo.save(new Category(null, "Audio"));
            Category accessories = categoryRepo.save(new Category(null, "Accessories"));

            // Create Products
            List<Product> products = productRepo.saveAll(List.of(
                    Product.builder()
                            .name("iPhone 14 Pro")
                            .purchasePrice(800)
                            .sellPrice(1200)
                            .stockQuantity(20)
                            .description("Apple smartphone with A16 chip")
                            .oldPrice(0.0)
                            .numberOfView(200)
                            .rating(4.8)
                            .numberOfComments(100)
                            .numberOfLiked(150)
                            .numberOfDisliked(5)
                            .date(LocalDate.now())
                            .category(smartphones)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Samsung Galaxy S23")
                            .purchasePrice(700)
                            .sellPrice(1100)
                            .stockQuantity(25)
                            .description("Flagship Android phone by Samsung")
                            .oldPrice(0.0)
                            .numberOfView(180)
                            .rating(3.5)
                            .numberOfComments(40)
                            .numberOfLiked(130)
                            .numberOfDisliked(3)
                            .date(LocalDate.now())
                            .category(smartphones)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("MacBook Air M2")
                            .purchasePrice(900)
                            .sellPrice(1400)
                            .stockQuantity(10)
                            .description("Apple lightweight laptop")
                            .oldPrice(0.0)
                            .numberOfView(100)
                            .rating(4.99)
                            .numberOfComments(100)
                            .numberOfLiked(120)
                            .numberOfDisliked(2)
                            .date(LocalDate.now())
                            .category(laptops)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Dell XPS 15")
                            .purchasePrice(950)
                            .sellPrice(1500)
                            .stockQuantity(15)
                            .description("High-performance Windows laptop")
                            .oldPrice(0.0)
                            .numberOfView(100)
                            .rating(4.7)
                            .numberOfComments(100)
                            .numberOfLiked(100)
                            .numberOfDisliked(1)
                            .date(LocalDate.now())
                            .category(laptops)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Sony WH-1000XM5")
                            .purchasePrice(200)
                            .sellPrice(350)
                            .stockQuantity(30)
                            .description("Noise-cancelling wireless headphones")
                            .oldPrice(0.0)
                            .numberOfView(150)
                            .rating(2.9)
                            .numberOfComments(50)
                            .numberOfLiked(160)
                            .numberOfDisliked(4)
                            .date(LocalDate.now())
                            .category(audio)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("JBL Charge 5")
                            .purchasePrice(80)
                            .sellPrice(150)
                            .stockQuantity(40)
                            .description("Portable Bluetooth speaker")
                            .oldPrice(0.0)
                            .numberOfView(130)
                            .rating(4.7)
                            .numberOfComments(28)
                            .numberOfLiked(110)
                            .numberOfDisliked(3)
                            .date(LocalDate.now())
                            .category(audio)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Logitech MX Master 3")
                            .purchasePrice(50)
                            .sellPrice(90)
                            .stockQuantity(60)
                            .description("Ergonomic wireless mouse")
                            .oldPrice(0.0)
                            .numberOfView(110)
                            .rating(3.6)
                            .numberOfComments(22)
                            .numberOfLiked(90)
                            .numberOfDisliked(1)
                            .date(LocalDate.now())
                            .category(accessories)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Samsung 27\" Monitor")
                            .purchasePrice(150)
                            .sellPrice(250)
                            .stockQuantity(18)
                            .description("4K Ultra HD monitor")
                            .oldPrice(0.0)
                            .numberOfView(85)
                            .rating(4.4)
                            .numberOfComments(15)
                            .numberOfLiked(75)
                            .numberOfDisliked(2)
                            .date(LocalDate.now())
                            .category(accessories)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("Google Pixel 8")
                            .purchasePrice(600)
                            .sellPrice(950)
                            .stockQuantity(22)
                            .description("Android phone with Google Tensor chip")
                            .oldPrice(0.0)
                            .numberOfView(170)
                            .rating(3.2)
                            .numberOfComments(20)
                            .numberOfLiked(10)
                            .numberOfDisliked(30)
                            .date(LocalDate.now())
                            .category(smartphones)
                            .colors(List.of())
                            .build(),

                    Product.builder()
                            .name("AirPods Pro 2")
                            .purchasePrice(180)
                            .sellPrice(270)
                            .stockQuantity(35)
                            .description("Wireless earbuds with noise cancellation")
                            .oldPrice(0.0)
                            .numberOfView(200)
                            .rating(3.8)
                            .numberOfComments(48)
                            .numberOfLiked(140)
                            .numberOfDisliked(5)
                            .date(LocalDate.now())
                            .category(audio)
                            .colors(List.of())
                            .build()
            ));



            // Create ProductColors with images (one per product here)
            productColorRepository.saveAll(List.of(
                    new ProductColor(null, "Space Black", "https://electrosalam.ma/cdn/shop/files/10_11_87bd80b1-d4e9-473f-86e1-eb5cbbfaab50.png?v=1751299222&width=1000", products.get(0)),
                    new ProductColor(null, "Phantom Black", "https://gtelstore.ma/wp-content/uploads/2023/12/samsung-galaxy-s23-256go-dual-sim-sm-s911bzecmwd_1.png", products.get(1)),
                    new ProductColor(null, "Silver", "https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0005959647_1.jpeg", products.get(2)),
                    new ProductColor(null, "Black", "https://m.media-amazon.com/images/I/81Vep45DQ4L._AC_SL1500_.jpg", products.get(3)),
                    new ProductColor(null, "Black", "https://www.sony.com/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF", products.get(4)),
                    new ProductColor(null, "Blue", "https://www.mediazone.ma/product/images/11912-huOL0Ml8/enceinte-portable-sans-fil-bluetooth-jbl-charge-5-rouge.jpg", products.get(5)),
                    new ProductColor(null, "Gray", "https://www.ultrapc.ma/19003-large_default/logitech-mx-master-3-graphite.jpg", products.get(6)),
                    new ProductColor(null, "Black", "https://www.pcgamer.ma/259714-large_default/samsung-27-led-f27t350fhm-moniteur.jpg", products.get(7)),
                    new ProductColor(null, "White", "https://mytechnology.lk/wp-content/uploads/2024/03/google-pixel-8.jpg", products.get(8)),
                    new ProductColor(null, "White", "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111851_sp880-airpods-Pro-2nd-gen.png", products.get(9))
            ));
        };
    }


}
