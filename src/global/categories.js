import {
  faDatabase,
  faLayerGroup,
  faServer,
  faDesktop,
  faMicrochip,
  faTerminal,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";


export const categoriesSmall = {
  automation: faRobot,
  fullstack: faLayerGroup,
  frontend: faDesktop,
  backend: faServer,
  hardware: faMicrochip,
};
const categoriesLarge = {
  systemsprogramming: faTerminal,
  datascience: faDatabase,
  ...categoriesSmall
};

export default categoriesLarge;
