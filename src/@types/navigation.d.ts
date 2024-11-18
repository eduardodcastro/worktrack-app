import { RootStackParamList } from "../routes/Root.routes";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
