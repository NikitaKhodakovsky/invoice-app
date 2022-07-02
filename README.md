# Invoice app solution

This is a solution to the [Invoice app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/invoice-app-i8KaLTQjl)

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshots](#screenshots)
-   [Built with](#built-with)
    -   [Common](#common)
    -   [Front End](#front-end)
    -   [Back End](#back-end)
-   [How to run an applilcation](#how-to-run-an-application)

## Overview

### The challenge

-   View the optimal layout for the app depending on their device's screen size
-   See hover states for all interactive elements on the page
-   Create, read, update, and delete invoices
-   Receive form validations when trying to create/edit an invoice
-   Save draft invoices, and mark pending invoices as paid
-   Filter invoices by status (draft/pending/paid)
-   Toggle light and dark mode

### Screenshots

![invoice-app:desktop:dark](https://user-images.githubusercontent.com/52799295/177012350-57f768c5-8964-44c9-89f6-e4b398c3f1a7.png)
![invoice-app:desktop:dark:invoice-page](https://user-images.githubusercontent.com/52799295/177012294-ac6b80d4-adb3-4c10-8c11-07ba9531e543.png)
![invoice-app:desktop:dark:sidebar](https://user-images.githubusercontent.com/52799295/177012380-30b0190f-f46d-4913-81be-95aab8795abe.png)
![invoice-app:mobile](https://user-images.githubusercontent.com/52799295/177012103-5eb7ef05-b8f0-441e-a347-c23be4d5d4c2.png)
![invoice-app:mobile:dark:sidebar](https://user-images.githubusercontent.com/52799295/177012394-906dedc0-ef4d-4ebf-9634-4c862f781c7e.png)
![invoice-app:mobile:light](https://user-images.githubusercontent.com/52799295/177012399-f85eb588-722d-4b15-9101-acba487cea01.png)
![invoice-app:mobile:light:sidebar](https://user-images.githubusercontent.com/52799295/177012440-ac4f2cdb-f8b4-4355-a480-b8823ecd47bc.png)




## Built with 

### Common

-   [NGINX](https://en.wikipedia.org/wiki/Nginx)
-   [Docker](<https://en.wikipedia.org/wiki/Docker_(software)>)
-   [GraphQL](https://graphql.org)
-   [TypeScript](https://www.typescriptlang.org)

### Front end

-   [React](https://reactjs.org)
-   [Formik](https://formik.org)
-   SASS / CSS modules
-   Mobile-first workflow

### Back end

-   [Express](https://expressjs.com)
-   [TypeGraphQL](https://typegraphql.com)
-   [Redis](https://en.wikipedia.org/wiki/Redis)
-   [PostgreSQL](https://en.wikipedia.org/wiki/PostgreSQL)
-   [TypeORM](https://typeorm.io)
-   Session based auth
-   [Jest](https://jestjs.io)

## How to run an application

To run the application you need to install [Docker](https://docs.docker.com/engine/install)

Then, run this command to verify that the installation is correct

```console
docker -v
```

You should see something like that:

```console
Docker version 20.10.17, build 100c701
```

Then, you need to clone this repository

```console
git clone https://github.com/NikitaKhodakovsky/invoice-app.git
```

Navigate to directory with this repository

```console
cd invoice-app
```

Then you need to execute this command:

```console
docker-compose up -d
```

This command starts your application

If you are running this application for the first time, you must create tables in the database. You do not need to do this step for subsequent runs, because all database data are saved in named volumes

In order to do this we need to access the terminal inside the container

```console
docker container exec -it invoice-app_server sh
```

Then type this command:

```console
npm run typeorm:prod schema:sync
```

You should see following output:

```console
Schema synchronization finished successfully.
```

Exit the terminal

```console
exit
```

The app is now available at http://localhost
