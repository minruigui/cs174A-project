import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export function draw_table(scene, context, program_state, model_transform){

    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.scale(10,0.5,20)),scene.materials.marble)
    //sides
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,20.1)).times(Mat4.scale(10.2,0.5,0.1)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,-20.1)).times(Mat4.scale(10.1,0.5,0.1)),scene.materials.wood)

   
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)

    // scene.shapes.box.draw(context, program_state, Mat4.scale(10, 0.5, 10).times(Mat4.translation(0, 21, 0)), scene.materials.floor);
}

export function draw_room(scene, context, program_state, model_transform){
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.scale(50,0.5,50)),scene.materials.plastic.override({color: hex_color("#aaaaaa") }))
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(0,0,-50)).times(Mat4.scale(50,50,0.5)),scene.materials.plastic.override({color: hex_color("#aaaaaa") }))

}