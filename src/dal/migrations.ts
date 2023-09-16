import { SequelizeStorage, Umzug } from 'umzug'
import { connect } from "."

// When adding imports for new migrations, add them to this list
import * as migration20230915203751 from "./migrations/20230915203751-create-user"
import * as migration20230916051725 from "./migrations/20230916051725-create-task"

// Include the new migration in the list
const migrationList: any[] = [
    migration20230915203751,
    migration20230916051725
];


// Initialize the umzug object
const umzug = async (env: any) => {
    const sequelize = connect(env);
    return new Umzug({
        migrations: migrationList,
        context: sequelize.getQueryInterface(),
        storage: new SequelizeStorage({ sequelize }),
        logger: console
    });
}

// Migration up and down functions
export const migrationUp = async (env: any): Promise<void> => {
    (await umzug(env)).up();
}

export const migrationDown = async (env: any): Promise<void> => {
    (await umzug(env)).down();
}