# PM

## Usage

### Local development

The application comes with a docker-compose project defining a database and application server. You may want to run the full stack for local development, or you can also run the application only, connecting to the live database.

# Preparations

Go to `webapp/WEB-INF/conf`, and look for `.template` files. These are templates for property files containing secrets, and thus are not included in the repo. Make a copy (without the .template extension) and fill the missing information (eg.: database credentials).

You must also edit `webapp/WEB-INF/web.xml` and change the line `#set ($baseHref = "https://pm.moon42.com/")`, to match the URL where your local server will be accessed. This is probably going to be `http://localhost:8080`.

#### Running the full stack

For the first time:

- Run `docker-compose up mysql`. This will give you a DB server. Fill the database with some initial/test data from a backup.
- Then run `docker-compose up` to run everything else.

#### Connecting to the live database

For editing templates, style and javascript, you may also run the app server without a local database, using the live one. This is dangerous, only do it for templating and styling changes. You must have access to the VPN, and configure the database connection in `setup.properties` accordingly.

To start the application only, run `docker-compose up --no-deps web`. You must use the `--no-deps` flag to avoid starting the DB server.

### Updating the live application

Changes made to templates, scripts or CSS files are reflected immediately. If you make other changes, you may need to restart the app server via `docker-compose restart web`.
