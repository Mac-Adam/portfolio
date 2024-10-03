const websiteText = {
  test: {
    pl: "To jest test",
    en: "This is a test",
  },
  learn_more: {
    pl: "Dowiedz się więcej",
    en: "Learn more",
  },
  suilo_gov_main: {
    pl: "Wybory do Samorządu",
    en: "Council Election",
  },
  suilo_gov_sub: {
    pl: "2020, 2021",
    en: "2020, 2021",
  },
  suilo_gov_des: {
    pl: "Wybory online przebiegły sprawnie ułatwiając pracę samorządu",
    en: "Online elections were successful, and made councilors job easier.",
  },
  suilo_student_main: {
    pl: "Usprawnienie Samorządu",
    en: "Improvement of Council",
  },
  suilo_student_sub: {
    pl: "",
    en: "",
  },
  suilo_student_des: {
    pl: "Usprawniło przepływ informacji między uczniami a Samorządem",
    en: "Made communication between students and School Council easier",
  },
  suilo_back_main: {
    pl: "Backend w Express",
    en: "Backend made with Express",
  },
  suilo_back_sub: {
    pl: "Java Script, Firebase",
    en: "Java Script, Firebase",
  },
  suilo_back_des: {
    pl: "Integracja autoryzacji, bazy danych noSQL Firestore",
    en: "Integration of authorization, noSQL Firestore databse",
  },
  suilo_front_main: {
    pl: "Frontend w React",
    en: "Frontend made with React",
  },
  suilo_front_sub: {
    pl: "Java Script",
    en: "Java Script",
  },
  suilo_front_des: {
    pl: "Interfejs administratora pozwala na edycję kontentu",
    en: "Admin interface allows for on-site content editions",
  },
  suilo_team_main: {
    pl: "Stworzone w grupie",
    en: "Made in a team",
  },
  suilo_team_sub: {
    pl: "3 os.",
    en: "of 3.",
  },
  suilo_team_des: {
    pl: "Byłem odpowiedzialny za stworzenie backendu",
    en: "I was responsible for developing backend",
  },
  suilo_title: {
    pl: "Strona Samorządu Uczniowskiego",
    en: "School Council Website",
  },
  github: {
    pl: "Zobacz na GitHub'ie",
    en: "View it on GitHub",
  },
  ws_esp_description: {
    pl: `Stacją kontroluje mikrokontroler ESP32, jest osadzony na zaprojektowanej i wykonanej przeze mnie 2 warstwowej płytce PBC.
    Kontroler jest odpowiedzialny za przetwarzanie informacji ze wszystkich czujników oraz przesyłanie ich na serwer.
    Program napisałem w Arduino IDE`,
    en: `Wether station is controlled by ESP32 microcontroller soldered to a custom made pcb I've designed.
    It is responsible for getting all the data out of the sensors and sending it to the server.
    I 've written the program using Arduino IDE `,
  },
  ws_rm_description: {
    pl: `Czujnik Deszczu, którego działanie można zobaczyć na animacji, działa na zasadzie podwójnego basenu z wodą posiadającego dwa punkty równowagi.
    Kiedy do basenu naleje się wystarczająco dużo wody, mechanizm zmienia swoje położenie. Do basenu przymocowane są magnesy, dzięki czemu kontaktron, znajdujący się pod obudową wyczuwa zmienne pole magnetyczne.
    Eliminacja odbić kontaktrona jest dokonywana w programie. 
    Duża wielkość leja pozwoliła na osiągnięcie dobrej dokładności odczytu przy rozdzielczości 0.3mm opadu
    Dodatkowo lej jest wyposażony w grzanie który pozwoli na pomiar opadu nawet kiedy pada śnieg`,
    en: `You can see, how the rain meter functions on the animation. It is based on a pool with two stable configurations.
    After enough water drips into the pool, it switches it's position. Magnets are mounted to the mechanism which allows a reed switch to detect the position change.
    Reed switch debouncing is done in software.
    Because of the funnel size, meter achieves good accuracy with a resolution of 0.3mm.
    Additionally the funnel is heated, this allows for also measuring the snow `,
  },
  ws_wm_description: {
    pl: `Czujnik kierunku wiatru oparty jest na obracającym się wale napędzanym trzema łopatkami.
    Do wału przymocowane są dwa magnesy, które obracając się, mijają kontaktron.
     Kontroler sczytuje Generowane impulsy obliczając na podstawie ich częstotliwości prędkość obrotową.
     Charakterystyka czujnika jest liniowa, łatwo więc prędkość obrotową zamienić na prędkość wiatru.
     Wiatr ustawia łopatkę czujnika równolegle do kierunku w którym wieje. 
     Kierunek ten odczytywany jest za pomocą enkodera magnetycznego`,
    en: `Blowing wind drives the wind speed meter shaft with two magnets mounted to it.
    While they spin they activate a reed switch which sends signals to the microcontroller. 
    Since the characteristic of the meter closely resembles a linear one, it is simple to calculate the wind speed based on the frequency of the pulses
    Wind direction meter head shape ensures that is is always aligned with the wind.
    The direction is later read by a magnetic encoder.`,
  },
  ws_3dp_description: {
    pl: `Wszystkie elementy stacji (za wyjątkiem elektroniki śrub i łożysk) są zaprojektowane do druku 3d.
    Ich kształt jest dobrany tak, aby elementy mogły być wydrukowane w najbardziej korzystnej pod względem wytrzymałości orientacji.
    Sugerowany materiał to ASA, ze względu na dobrą odporność na warunki atmosferyczne oraz możliwość łatwego klejenia.
    Łączenie elementów zapewniają wtopione gwinty oraz śruby`,
    en: `Each element of the station (excluding electronics bolts and bearings) is designed to be 3d printed.
    Shape of the elements is chosen so that the print can be made in the orientation where the layers are the strongest.
    ASA is my material of choice due to its resistance to UV as well as the ease of glueing it together.
    The elements are connected with threaded inserts and bolts`,
  },
  ws_other_description: {
    pl: `Pozostałe pomiary są wykonywane przy pomocy czujników bme280, oraz pms5003.
    Ten pierwszy odpowiada za pomiar temperatury, ciśnienia oraz wilgotności powietrza.
    Ten drugi odpowiada za pomiar zanieczyszczenia powietrza.
    Aktualna wersja stacji, jest trzecią iteracją tego projektu`,
    en: `Other measurements are made with bme280 and pms5003 meters.
    The first one measures temperature, pressure and humidity, while the other measures air quality.
    The current weather station is the third iteration of the project`,
  },
  ws_web_description: {
    pl: `Projekt ten jest realizowany wraz z moim tatą, on stworzył stronę na której można zobaczyć wszystkie dane.
    Docelowo będzie istniało kilka stacji których dane będzie można zobaczyć na stronie : www.stacja.fun
    Dostępne będą statystyki dzienne tygodniowe i miesięczne ze wszystkich pomiarów`,
    en: `The project is made in cooperation with my father, he is creating the website.
    On the www.stacja.fun website you will be able to see daily, weekly and monthly statistics from multiple weather stations.`,
  },
  ws_web_short_description: {
    pl: "Dane ze stacji można obejrzeć poprzez stronę internetową",
    en: "All the data can be viewed via a website",
  },
  ws_web_name: {
    pl: "Strona Internetowa",
    en: "Website",
  },
  ws_other_short_description: {
    pl: "Czujniki pms5003 oraz bme280 mierzą poziom zanieczyszczenia, temperaturę, ciśnienie oraz wilgotność",
    en: "pms5003 and bme280 are responsible for measuring air quality, temperature, pressure and humidity",
  },
  ws_other_name: {
    pl: "Pozostałe czujniki",
    en: "Other Meters",
  },
  ws_3dp_name: {
    pl: "Do druku 3d",
    en: "3d Printable",
  },
  ws_wm_short_description: {
    pl: "Osobne czujniki prędkości i kierunku wiatru zapewniają dokładne pomiary",
    en: "Two custom made meters allow for wind speed and direction measurements",
  },
  ws_wm_name: {
    pl: "Czujniki Wiatru",
    en: "Wind Meters",
  },
  ws_rm_short_description: {
    pl: "Stacja została wyposażona w ogrzewany czujnik deszczu i śniegu",
    en: "3d printed heated rain/snow meter enables accurate readings",
  },
  ws_rm_name: {
    pl: "Czujnik Deszczu",
    en: "Rain Meter",
  },
  ws_esp_name: {
    pl: "ESP32",
    en: "ESP32",
  },
  lang_bundle: {
    pl: "Język",
    en: "Language",
  },
  weather_bundle: {
    pl: "Stacja Pogodowa",
    en: "Weather Station",
  },
  suilo_bundle: {
    pl: "Strona SUILO",
    en: "SUILO Website",
  },
  about_bundle: {
    pl: "O Mnie",
    en: "About Me",
  },
};
export default websiteText;
