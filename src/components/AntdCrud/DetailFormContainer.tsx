import {Drawer, Modal} from "antd";
import {ModalProps} from "antd/es/modal/interface";
import {DrawerProps} from "antd/es/drawer";

export type Props = {
    type: "modal" | "drawer",
    children: any,
    props?: any,
} & ModalProps & DrawerProps

const DetailFormContainer = (props: Props) => {
    if ("modal" === props.type) {
        return <Modal {...props} >{props.children}</Modal>
    }
    return <Drawer {...props}>{props.children}</Drawer>
};

export default DetailFormContainer