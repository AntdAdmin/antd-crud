import {ModalProps} from "antd/es/modal/interface";
import {Drawer, Modal} from "antd";
import {DrawerProps} from "antd/es/drawer";

export type Props = {
    type: "modal" | "drawer",
    children: any,
    props?: any,
} & ModalProps & DrawerProps

const MyModal = (props: Props) => {
    const isModal = "modal" === props.type;
    return (
        <>
            {isModal && <Modal {...props} >{props.children}</Modal>}
            {!isModal && <Drawer {...props}>
                {props.children}
            </Drawer>}
        </>
    )
};

export default MyModal