
export class Constants {
    public static readonly WORLD_CUP_REGEX = /FIFA Men's World Cup/;
    public static readonly WOMEN = 'Women';

    public static readonly confederations = ['AFC','CAF','CONCACAF','CONMEBOL','OFC','UEFA'];

    public static readonly NUMBER_OF_QUESTIONS_PER_ROUND = 10;
    public static readonly QUESTIONS_POOL_SIZE = 300;
    public static readonly QUESTION_POOL_KEY = 'worldcup_question_pool_v2';

    public static readonly countriesMap: Record<string, string> = {
        // Germany
        "Westdeutschland": "Deutschland",
        "West Germany": "Germany",
        "Allemagne de l'Ouest": "Allemagne",
        "Niemcy Zachodnie": "Niemcy",
        "Alemania Occidental": "Alemania",
        "Alemanha Ocidental": "Alemanha",

        // USSR → Russia (simplification, depends on your data model)
        "Soviet Union": "Russia",
        "ZSRR": "Rosja",
        "URSS": "Russie",
        "Unión Soviética": "Rusia",
        "União Soviética": "Rússia",

        // Yugoslavia → Serbia (simplification!)
        "Yugoslavia": "Serbia",
        "Jugosławia": "Serbia",
        "Yougoslavie": "Serbie",
        "Yugoslavia (ES)": "Serbia",
        "Iugoslávia": "Sérvia",

        // Czechoslovakia → Czech Republic
        "Czechoslovakia": "Czech Republic",
        "Czechosłowacja": "Czechy",
        "Tchécoslovaquie": "République tchèque",
        "Checoslovaquia": "República Checa",
        "Checoslováquia": "República Tcheca"
    };
}