import {defs, tiny } from './examples/common.js'

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

let light_up_walls = false;
let last_time = 0;
let last_time2 = 0;
const white = "#ffffff"
const blue = "#0000ff"
const red = "#ff0000"

function colorToHex(r, g, b) {
    // Convert each color component to a hexadecimal string and pad with zeros if necessary
    r = Math.floor(r)
    g = Math.floor(g)
    b = Math.floor(b)

    if(r < 0){ r = 0 }
    else if (r > 255){ r = 255 }

    if(g < 0){ g = 0 }
    else if (g > 255){ g = 255 }

    if(b < 0){ b = 0 }
    else if (b > 255){ b = 255 }

    const toHex = c => c.toString(16).padStart(2, '0');

    // Concatenate the hexadecimal strings
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}


export function draw_walls(scene, context, program_state, model_transform, light, last_player, walls, last_player2){
    let first_color, second_color, third_color, fourth_color, fifth_color
    function setAllColors(color){
        first_color = color
        second_color = color
        third_color = color
        fourth_color = color
        fifth_color = color
    }

    let t = program_state.animation_time / 1000;
    if(light){
        last_time = t;
    }
    if(walls){
        last_time2 = t;
    }

    //let default_color = colorToHex(255 * Math.sin(t) + 100, 255 * Math.sin(t) + 100, 255 * Math.sin(t) + 100)
    let default_color = white

    // Default colors
    setAllColors(default_color)

    const time_since1 = t - last_time
    const time_since2 = t - last_time2

    if(last_player === 0){
        // Hit player paddle
        if(time_since1 < 0.1){
            first_color = blue;
        } else if(time_since1 < 0.2) {
            second_color = blue;
        } else if (time_since1 < 0.3) {
            third_color = blue;
        } else if (time_since1 < 0.4){
            fourth_color = blue;
        } else if (time_since1 < 0.5){
            fifth_color = blue;
        }
    } else if (last_player === 1) {
        // Hit opponent paddle
        if(time_since1 < 0.1){
            first_color = red;
        } else if(time_since1 < 0.2) {
            second_color = red;
        } else if (time_since1 < 0.3) {
            third_color = red;
        } else if (time_since1 < 0.4){
            fourth_color = red;
        } else if (time_since1 < 0.5){
            fifth_color = red;
        }
    }

    if(last_player2 === 0){
        // Player win
        if(time_since2 < 1){
            setAllColors(colorToHex(((Math.cos(2 * Math.PI * 2 * time_since2) + 1) / 2), 255 * ((Math.cos(2 * Math.PI * 2 * time_since2) + 1) / 2), 255));
        }
    } else if (last_player2 === 1) {
        // Enemy win
        if(time_since2 < 1){
            setAllColors(colorToHex(255, 255 * ((Math.cos(2 * Math.PI * 2 * time_since2) + 1) / 2), 255 * ((Math.cos(2 * Math.PI * 2 * time_since2) + 1) / 2)));
        }
    }


    // Back wall
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 30, -30)).times(Mat4.scale(35, 30, 1)), scene.shadow_pass? scene.materials.wall : scene.pure)
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 6, -50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.plastic.override({
            color: hex_color(first_color),
            ambient: 0.4,
            diffusivity: 0.6,
            specularity: 0,
        }) : scene.pure.override({color: hex_color(first_color)})
    );

    // BLACKBOARD
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 25, -49))
            .times(Mat4.scale(20, 7, 0.5)),
        scene.shadow_pass ? scene.materials.plastic.override({color:hex_color("#222222")}) : scene.pure
    );

    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 18, -50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(second_color)}) : scene.pure.override({color: hex_color(second_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 30, -50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(third_color)}) : scene.pure.override({color: hex_color(third_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 42, -50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(fourth_color)}) : scene.pure.override({color: hex_color(fourth_color)})
    );


    // Back wall
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 6, 50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.plastic.override({
            color: hex_color(first_color),
            ambient: 0.4,
            diffusivity: 0.6,
            specularity: 0,
        }): scene.pure.override({color: hex_color(first_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 18, 50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(second_color)}) : scene.pure.override({color: hex_color(second_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 30, 50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(third_color)}) : scene.pure.override({color: hex_color(third_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.translation(0, 42, 50))
            .times(Mat4.scale(35, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(fourth_color)}) : scene.pure.override({color: hex_color(fourth_color)})
    );

    // Left walls, bottom to top, only difference is in translation
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 0, 1, 0)).times(Mat4.translation(0, 30, -35)).times(Mat4.scale(30, 30, 1)), scene.shadow_pass? scene.materials.wall : scene.pure)
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.translation(0, 6, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.plastic.override({
            color: hex_color(first_color),
            ambient: 0.4,
            diffusivity: 0.6,
            specularity: 0,
        }) : scene.pure.override({color: hex_color(first_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.translation(0, 18, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(second_color)}) : scene.pure.override({color: hex_color(second_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.translation(0, 30, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(third_color)}) : scene.pure.override({color: hex_color(third_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
            .times(Mat4.translation(0, 42, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(fourth_color)}) : scene.pure.override({color: hex_color(fourth_color)})
    );

    // Right wall
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(3 * Math.PI / 2, 0, 1, 0)).times(Mat4.translation(0, 30, -35)).times(Mat4.scale(30, 30, 1)), scene.shadow_pass? scene.materials.wall : scene.pure)
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
            .times(Mat4.translation(0, 6, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.plastic.override({
            color: hex_color(first_color),
            ambient: 0.4,
            diffusivity: 0.6,
            specularity: 0,
        }): scene.pure.override({color: hex_color(first_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
            .times(Mat4.translation(0, 18, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(second_color)}) : scene.pure.override({color: hex_color(second_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
            .times(Mat4.translation(0, 30, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(third_color)}) : scene.pure.override({color: hex_color(third_color)})
    );
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
            .times(Mat4.translation(0, 42, -35))
            .times(Mat4.scale(50, 6, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(fourth_color)}) : scene.pure.override({color: hex_color(fourth_color)})
    );

    // Ceiling
    // Legacy code below
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 0, -60)).times(Mat4.scale(35, 30, 1)), scene.shadow_pass? scene.materials.wall : scene.pure)
    scene.shapes.box.draw(
        context,
        program_state,
        model_transform
            .times(Mat4.rotation(Math.PI / 2, 1, 0, 0))
            .times(Mat4.translation(0, 0, -48))
            .times(Mat4.scale(35, 50, 1)),
        scene.shadow_pass ? scene.materials.wall.override({color: hex_color(fifth_color)}) : scene.pure.override({color: hex_color(fifth_color)})
    );

    // Floor
    //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 0, 0)).times(Mat4.scale(35, 30, 1)), scene.materials.plastic.override({color: hex_color("#5E5D59")}))


}