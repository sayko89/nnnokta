# Nokta Capture — Track A: Engineering-Guided Specification

Bu belge, Nokta projesinin **Track A (Dot Capture & Enrich)** dilimine ait özelleştirilmiş anayasasıdır ve slop-free üretim felsefesine sıkı sıkıya bağlıdır.

## 1. Thesis (Tez)
Bir fikrin değerli olabilmesi için pazarlama süslemelerinden arınmış, "ne olduğu" kadar "ne gibi kısıtlamalara tabi olduğu" da netleştirilmiş bir sistem mimarisine (artifact) dönüşmesi gerekir. Nokta Capture, kullanıcının ham fikrini alır, acımasız bir sistem mühendisi gibi sorgular ve teknik bir spesifikasyon tablosu üretir.

## 2. Core Mechanism (Nasıl Çalışır?)
Uygulama, jenerik (slop) LLM çıktılarını reddeder. Bunun yerine şu akışı izler:
1. **Raw Input:** Kullanıcı dağınık fikrini veya not dökümünü girer.
2. **Engineering Interrogation (Sorgu):** AI, fikrin sınırlarını zorlayan 3 adet teknik kısıt sorusu sorar (Örn: Edge vs Cloud compute load, Offline fallback senaryosu, Hardware bottleneck).
3. **Artifact Generation:** Soruların yanıtlanmasıyla sistem, slop skorunu hesaplar ve net bir "Requirement Specification" (Gereksinim Belgesi) üretir.

## 3. Anti-Slop Constraint
Oluşturulan nihai belge, uzun paragraflardan oluşamaz. Sistemin darboğazlarını ve ana akışını gösteren bir yapı (JSON veya katı yapılandırılmış Markdown) olmak zorundadır.