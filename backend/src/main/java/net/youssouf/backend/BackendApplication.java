package net.youssouf.backend;

import net.youssouf.backend.entities.*;
import net.youssouf.backend.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@SpringBootApplication
public class BackendApplication {

        public static void main(String[] args) {
                SpringApplication.run(BackendApplication.class, args);
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        CommandLineRunner initData(
                ProductRepository productRepo,
                CategoryRepository categoryRepo,
                AppUserRepository userRepo,
                RoleRepository roleRepo,
                CommentRepository commentRepository,
                CartRepository cartRepository,
                CartItemRepository cartItemRepository,
                PasswordEncoder passwordEncoder
        ) {
                return args -> {


                        Role clientRole = roleRepo.save(new Role(null, "ROLE_CLIENT"));
                        Role adminRole = roleRepo.save(new Role(null, "ADMIN"));

                        // Admin user
                        AppUser adminUser = new AppUser();
                        adminUser.setUsername("admin");
                        adminUser.setEmail("admin@example.com");
                        adminUser.setPassword(passwordEncoder.encode("admin"));
                        adminUser.setRoles(Set.of(adminRole, clientRole));
                        userRepo.save(adminUser);
                        System.out.println("Admin user created with roles.");
                        System.out.println(adminUser);

                        // Client user
                        AppUser clientUser = new AppUser();
                        clientUser.setUsername("client1");
                        clientUser.setEmail("client1@example.com");
                        clientUser.setPassword(passwordEncoder.encode("client1"));
                        clientUser.setRoles(Set.of(clientRole));
                        userRepo.save(clientUser);

                        // Create Categories
                        Category smartphones = categoryRepo.save(new Category(null, "Smartphones",
                                "https://img.freepik.com/premium-photo/smartphone-frameless-display-edgetoedge-screen-blank-screen-mockup_1243992-22427.jpg?w=2000"));
                        Category laptops = categoryRepo.save(new Category(null, "Laptops",
                                "https://www.hp.com/content/dam/sites/worldwide/homepage/images/pcs-main.png"));
                        Category audio = categoryRepo.save(new Category(null, "Audio",
                                "https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/speakers.png"));
                        Category accessories = categoryRepo.save(new Category(null, "Accessories",
                                "https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/accessories.png"));
                        Category cameras = categoryRepo.save(new Category(null, "Cameras",
                                "https://resource.logitech.com/w_300,h_300,ar_1,c_fill,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/logitech/en/homepage/delorean-hp/products-with-background/new-images/conference-room-cameras.png"));

                        // Create Products with imageUrls directly
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(smartphones)
                                        .imageUrls(List.of(
                                                "https://electrosalam.ma/cdn/shop/files/10_11_87bd80b1-d4e9-473f-86e1-eb5cbbfaab50.png?v=1751299222&width=1000",
                                                 "https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0006166469.jpg"
                                        ))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(smartphones)
                                        .imageUrls(List.of(
                                                "https://gtelstore.ma/wp-content/uploads/2023/12/samsung-galaxy-s23-256go-dual-sim-sm-s911bzecmwd_1.png"
                                        ))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(laptops)
                                        .imageUrls(List.of("https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0005959647_1.jpeg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(laptops)
                                        .imageUrls(List.of("https://m.media-amazon.com/images/I/81Vep45DQ4L._AC_SL1500_.jpg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(audio)
                                        .imageUrls(List.of("https://www.sony.com/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(audio)
                                        .imageUrls(List.of("https://www.mediazone.ma/product/images/11912-huOL0Ml8/enceinte-portable-sans-fil-bluetooth-jbl-charge-5-rouge.jpg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(accessories)
                                        .imageUrls(List.of("https://www.ultrapc.ma/19003-large_default/logitech-mx-master-3-graphite.jpg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(accessories)
                                        .imageUrls(List.of("https://www.pcgamer.ma/259714-large_default/samsung-27-led-f27t350fhm-moniteur.jpg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(smartphones)
                                        .imageUrls(List.of("https://mytechnology.lk/wp-content/uploads/2024/03/google-pixel-8.jpg"))
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
                                        .colors(List.of("red","blue","green","yellow"))
                                        .date(LocalDate.now())
                                        .category(audio)
                                        .imageUrls(List.of(
                                                "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111851_sp880-airpods-Pro-2nd-gen.png"
                                        ))
                                        .build()
                        ));


                        List<Comment> comments = List.of(
                                // Avec utilisateur connecté
                                Comment.builder()
                                        .content("Produit exceptionnel, je l’utilise tous les jours !")
                                        .rating(5)
                                        .createdAt(LocalDateTime.now())
                                        .authorName(clientUser.getUsername())
                                        .user(clientUser)
                                        .product(productRepo.findById(1L))
                                        .build(),

                                Comment.builder()
                                        .content("Bon rapport qualité/prix, rien à dire.")
                                        .rating(4)
                                        .createdAt(LocalDateTime.now())
                                        .authorName(clientUser.getUsername())
                                        .user(clientUser)
                                        .product(productRepo.findById(2L))
                                        .build(),

                                Comment.builder()
                                        .content("Correct sans plus, quelques défauts à l’usage.")
                                        .rating(3)
                                        .createdAt(LocalDateTime.now())
                                        .authorName(clientUser.getUsername())
                                        .user(clientUser)
                                        .product(productRepo.findById(3L))
                                        .build(),

                                // Anonyme
                                Comment.builder()
                                        .content("Très déçu, je m’attendais à mieux.")
                                        .rating(2)
                                        .createdAt(LocalDateTime.now())
                                        .authorName("Client anonyme")
                                        .user(null)
                                        .product(productRepo.findById(4L))
                                        .build(),

                                Comment.builder()
                                        .content("Catastrophique, je regrette mon achat.")
                                        .rating(1)
                                        .createdAt(LocalDateTime.now())
                                        .authorName("Utilisateur inconnu")
                                        .user(null)
                                        .product(productRepo.findById(5L))
                                        .build()
                        );

                        commentRepository.saveAll(comments);

                        AppUser user1 = userRepo.findById(1L);
                        AppUser user2 = userRepo.findById(2L);

                        Product p1 = productRepo.findById(1L);
                        Product p2 = productRepo.findById(2L);
                        Product p3 = productRepo.findById(3L);
                        Product p4 = productRepo.findById(4L);
                        Product p5 = productRepo.findById(5L);

                        // Paniers utilisateurs
                        Cart cart1 = new Cart(null, user2, null, false, LocalDateTime.now(), new ArrayList<>());
                        Cart cart2 = new Cart(null, user2, null, false, LocalDateTime.now(), new ArrayList<>());
                        Cart cart3 = new Cart(null, user1, null, false, LocalDateTime.now(), new ArrayList<>());

                        // Paniers anonymes avec sessionId
                        Cart cart4 = new Cart(null, null, "session-abc123", false, LocalDateTime.now(), new ArrayList<>());
                        Cart cart5 = new Cart(null, null, "session-xyz789", false, LocalDateTime.now(), new ArrayList<>());

                        // Sauvegarde
                        cartRepository.saveAll(List.of(cart1, cart2, cart3, cart4, cart5));

                        // Ajout des items
                        cartItemRepository.save(new CartItem(null, cart1, p1, 2));
                        cartItemRepository.save(new CartItem(null, cart2, p2, 1));
                        cartItemRepository.save(new CartItem(null, cart3, p3, 4));
                        cartItemRepository.save(new CartItem(null, cart4, p4, 3));
                        cartItemRepository.save(new CartItem(null, cart5, p5, 1));


                };

        }
}
