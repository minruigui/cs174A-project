import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export function draw_table(scene, context, program_state, model_transform){

    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.scale(10,0.5,20)),scene.materials.plastic.override({color: hex_color("#00ff00") }))
    //sides
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.plastic.override({color: hex_color("#2222ff") }))
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(-10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.plastic.override({color: hex_color("#2222ff") }))
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,20.1)).times(Mat4.scale(10.2,0.5,0.1)),scene.materials.plastic.override({color: hex_color("#2222ff") }))
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,-20.1)).times(Mat4.scale(10.1,0.5,0.1)),scene.materials.plastic.override({color: hex_color("#2222ff") }))

   
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.plastic)
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.plastic)
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.plastic)
    scene.shapes.cube.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.plastic)
}