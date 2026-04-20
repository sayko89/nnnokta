# Nokta Forge — Track A: The Anti-Slop Crucible

Nokta Forge, ham fikirlerin (noktaların) konfor alanından çıkarılıp mühendislik kısıtlarıyla yüzleştirildiği adaptif bir kuluçka modülüdür. 

## 1. Thesis (Tez)
Standart LLM arayüzleri, kullanıcıyı onaylamak ve jenerik metinler (slop) üretmek üzere eğitilmiştir. Nokta Forge ise "Red-Teaming" mantığıyla çalışır. Kullanıcının fikrini onaylamak yerine, o fikrin en zayıf donanımsal veya yazılımsal halkasına saldırır. Fikir ancak bu teknik sorgudan (Interrogation) sağ çıkarsa bir "Artifact" (Spesifikasyon) halini alır.

## 2. A2UI & Recursive Interrogation (Nasıl Çalışır?)
1. **Dynamic Context:** Fikir girildiğinde sistem alan taraması yapar (Örn: Aviyonik, Mobil, Tarım). Arayüz (A2UI) bu domaine göre renk ve terminoloji değiştirir.
2. **Slop Meter (Çöp-Fikir Radarı):** Kullanıcının cevaplarındaki teknik terim yoğunluğu (entropy) ölçülür. Yüzeysel cevaplar reddedilir ve kullanıcı daha spesifik kısıtlar (Scope/Constraint) vermeye zorlanır.
3. **The Blueprint:** 3-5 turluk iterasyonun sonunda, yatırımcıya veya mühendise doğrudan verilebilecek, "Complexity Score" (Zorluk Derecesi) hesaplanmış tek sayfalık bir "Technical Spec Card" üretilir.