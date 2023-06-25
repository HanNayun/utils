import { Vec3, Node, UITransform } from "cc";
/**
* 获取UI节点的全局坐标
* @param node
*/
export function getUiNodeGlobalPosition(node: Readonly<Node> | Node): Vec3 {
    const parent = node.parent;
    if (!parent) {
        throw new Error(`node ${node.name} has no parent`);
    }

    const pos = parent.getComponent(UITransform)?.convertToWorldSpaceAR(node.position);
    if (!pos) {
        throw new Error(`node ${node.name} has no UITransform component`);
    }

    return pos;
}

/**
 * 获取3D节点投影到屏幕上的坐标
 * @param scene_node
 * @param ui_node
 */
export function convertSceneNodeToUiPosition(scene_node: Node, ui_node: Node): Vec3 {
    // get the scene camera
    const camera = SceneManager.currentScene.camera;
    const world_pos = scene_node.worldPosition;
    return camera.convertToUINode(world_pos, ui_node);
}