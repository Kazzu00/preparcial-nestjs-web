# Preparcial NestJS

## Descripción General

El objetivo del proyecto es integrar conocimientos de NestJS para resolver un problema de negocio:

1.  **CountriesModule**: Gestiona la información de países, consumiendo la API pública de [RestCountries](https://restcountries.com/), almacena la información en una base de datos local y la sirve al usuario.
2.  **TravelPlansModule**: Gestiona la creación y listado de planes de viaje asociados a un país específico[cite: 23].

## Tecnologías Utilizadas

* **Framework:** NestJS
* **Base de Datos:** SQLite (archivo local `travel_db.sqlite`)
* **ORM:** TypeORM
* **Cliente HTTP:** Axios (@nestjs/axios)
* **Validación:** class-validator & class-transformer

---

## Instalación y Ejecución 

### 1. Prerrequisitos
* Tener instalado **Node.js** (LTS).
* Tener un gestor de paquetes como **npm**.

### 2. Instalar dependencias
Ejecutar en terminal:

```
npm install
```
### 3. Configuración de Base de Datos
El proyecto utiliza SQLite. No es necesario instalar un servidor de base de datos externo dado que al ejecutar la aplicación TypeORM creará automáticamente el archivo travel_db.sqlite en la raíz del proyecto y generará las tablas necesarias.

### 4. Ejecutar la API
Para iniciar el servidor en modo desarrollo:

npm run start:dev

La cual estará disponible en http://localhost:3000 por defecto.

#### 5. Documentación de Endpoints

##### Módulo de Países (/countries)

1. Listar todos los países cacheados

* Método: GET
* Ruta: /countries
* Descripción: Retorna la lista de países que ya han sido guardados en la base de datos local.

2. Consultar un país por código
* Método: GET
* Ruta: /countries/:code
* Descripción:Busca en la base de datos local, si existe lo retorna con "source": "local-cache" y si no existe lo busca en la API de RestCountries para guardarlo en local y retornarlo como "source": "external-api".
* Ejemplo: /countries/COL

##### Módulo de Planes de Viaje (/travel-plans)
1. Crear un plan de viaje

* Método: POST
* Ruta: /travel-plans
* Descripción: Crea un nuevo plan. Valida internamente si el countryCode existe. Si el país no está en base de datos, el sistema intenta buscarlo en la API externa automáticamente antes de crear el plan.
Ejemplo Body:
{
  "countryCode": "JPN",
  "title": "Viaje a Tokio",
  "startDate": "2024-10-01",
  "endDate": "2024-10-15",
  "notes": "Visitar el monte Fuji"
}

2. Listar planes de viaje

Método: GET

Ruta: /travel-plans

#### 6. Arquitectura y Provider Externo

Provider: RestCountriesProvider
Para cumplir con los principios de responsabilidad única, la lógica de conexión con la API externa se aisló en un Provider dedicado (src/countries/providers/rest-countries.provider.ts).

* Función: Encapsula la petición HTTP a restcountries.com.

* Optimización: Solicita únicamente los campos necesarios usando el filtro ?fields= de la API externa para no traer datos basura.

* Inyección: Este provider es inyectado en el CountriesService, permitiendo que el servicio de dominio no conozca los detalles de la URL o la infraestructura externa.

#### 7. Modelo de Datos

* Entidad: Country 
Representa la información cacheada de un país.

- code: Código Alpha-3 (ej: "ARG"). Único.
- name: Nombre común del país.
- region: Región geográfica.
- subregion: Subregión.
- capital: Capital del país.
- population: Número de habitantes.
- flagUrl: URL de la bandera (PNG).

* Entidad: TravelPlan 
Representa un viaje planeado por el usuario.

- id: Identificador único autogenerado.
- countryCode: Código del país destino.
- title: Nombre del viaje.
- startDate: Fecha de inicio.
- endDate: Fecha de fin.
- notes: Notas opcionales.

#### 8. Pruebas Realizadas
Se probo el funcionamiento de la API mediante Thunder client para los metodos GET y POST.