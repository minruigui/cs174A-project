import {defs, tiny } from './examples/common.js'

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

let light_up_walls = false;
let last_time = 0;
const white = "#ffffff"
const blue = "#0000ff"
const red = "#ff0000"


export function draw_walls(scene, context, program_state, model_transform, light, last_player){

    let t = program_state.animation_time / 1000;
    if(light){
        last_time = t;
    }
    console.log(last_time)

    // Colors
    let first_color = white
    let second_color = white
    let third_color = white
    let fourth_color = white
    let fifth_color = white

    const time_since = t - last_time

    if(last_player === 0){
        if(time_since < 0.1){
            first_color = blue;
        } else if(time_since < 0.2) {
            second_color = blue;
        } else if (time_since < 0.3) {
            third_color = blue;
        } else if (time_since < 0.4){
            fourth_color = blue;
        } else if (time_since < 0.5){
            fifth_color = blue;
        }
    } else if (last_player === 1) {
        if(time_since < 0.1){
            first_color = red;
        } else if(time_since < 0.2) {
            second_color = red;
        } else if (time_since < 0.3) {
            third_color = red;
        } else if (time_since < 0.4){
            fourth_color = red;
        } else if (time_since < 0.5){
            fifth_color = red;
        }
    }


    // Back wall
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 30, -30)).times(Mat4.scale(35, 30, 1)), scene.materials.wall)
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 6, -45)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(first_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 18, -45)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(second_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 30, -45)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(third_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 42, -45)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(fourth_color)}))

    // Front wall
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 30, -30)).times(Mat4.scale(35, 30, 1)), scene.materials.wall)
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI, 0, 1, 0)).times(Mat4.translation(0, 6, -47)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(first_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI, 0, 1, 0)).times(Mat4.translation(0, 18, -47)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(second_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI, 0, 1, 0)).times(Mat4.translation(0, 30, -47)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(third_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI, 0, 1, 0)).times(Mat4.translation(0, 42, -47)).times(Mat4.scale(35, 6, 1)), scene.materials.plastic.override({color: hex_color(fourth_color)}))




    // Left walls, bottom to top, only difference is in translation
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(0, 30, -35)).times(Mat4.scale(30, 30, 1)), scene.materials.wall)
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(-1, 6, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(first_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(-1, 18, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(second_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(-1, 30, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(third_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(-1, 42, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(fourth_color)}))



    // Right wall
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(0, 30, -35)).times(Mat4.scale(30, 30, 1)), scene.materials.wall)
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(1, 6, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(first_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(1, 18, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(second_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(1, 30, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(third_color)}))
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(1, 42, -35)).times(Mat4.scale(47, 6, 1)), scene.materials.wall.override({color: hex_color(fourth_color)}))




    // Ceiling
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 0, -60)).times(Mat4.scale(35, 30, 1)), scene.materials.wall)
    scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 1, -48)).times(Mat4.scale(35, 47, 1)), scene.materials.wall.override({color: hex_color(fifth_color)}))


    // Floor
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 0, 0)).times(Mat4.scale(35, 30, 1)), scene.materials.plastic.override({color: hex_color("#5E5D59")}))


}