# ToDoApp
Preprosta spletna aplikacija za upravljanje nalog, izdelana s tehnologijami Spring Boot, MySQL in Vite (HTML, CSS, JavaScript).  
Aplikacija omogoča ustvarjanje, urejanje, brisanje in filtriranje nalog ter označevanje opravljenih.

## Opis projekta
ToDoApp uporabniku omogoča vodenje seznama opravil (nalog).  
Uporabnik lahko:
- doda novo nalogo z imenom, opisom, rokom in oznako pomembnosti,
- pregleda vse obstoječe naloge,
- označi nalogo kot opravljeno,
- uredi ali izbriše nalogo,
- filtrira in sortira naloge po različnih kriterijih,
- uporablja paginacijo za bolj pregledno prikazovanje daljših seznamov.

Podatki se shranjujejo v MySQL podatkovno bazo, backend je zgrajen s Spring Boot, frontend pa je izdelan v Vite (JavaScript) okolju.

## Tehnologije
- Backend: Spring Boot 3.5, Java 17, Spring Data JPA, MySQL
- Frontend: HTML, CSS, JavaScript (Vite)
- Baza: MySQL 8.0
- Razvojno okolje: IntelliJ IDEA


## Navodila za zagon
### Backend
1. Zazenemo backend/src/main/java/com/example/todoapp/ToDoAppApplication.java

### Frontend
1. V frontend direktorij terminalu napisemo komandu 'npm run dev'

Aplikacija se ustvari na localhost:8080

