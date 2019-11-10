import {
  Button,
  Card,
  Col,
  Container,
  Drawer,
  Form,
  FormItem,
  Header,
  Icon,
  Input,
  Menu,
  MenuItem,
  Submenu,
  Message,
  Row
} from "element-ui"

const ElementUI = {
  install: function (Vue: any) {
    Vue.use(Button)
    Vue.use(Card)
    Vue.use(Container)
    Vue.use(Col)
    Vue.use(Drawer)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Header)
    Vue.use(Icon)
    Vue.use(Input)
    Vue.use(Submenu)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Message)
    Vue.use(Row)
  }
};

export default ElementUI;
