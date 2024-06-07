import { defs, tiny } from "./examples/common.js";
import { light_up_wall } from "./pong.js";

const {
  Vector,
  Vector3,
  vec,
  vec3,
  vec4,
  color,
  hex_color,
  Matrix,
  Mat4,
  Light,
  Shape,
  Material,
  Scene,
} = tiny;

let light_up_walls = false;

export function draw_walls(
  scene,
  context,
  program_state,
  model_transform,
  light
) {
  // Back wall
  // Legacy code below
  //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0, 30, -30)).times(Mat4.scale(35, 30, 1)), scene.shadow_pass? scene.materials.wall : scene.pure)
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 6, -50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );

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
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 30, -50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 42, -50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );



  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 6, 50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );

  
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 18, 50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 30, 50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.translation(0, 42, 50))
      .times(Mat4.scale(35, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
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
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.translation(0, 18, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.translation(0, 30, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation(Math.PI / 2, 0, 1, 0))
      .times(Mat4.translation(0, 42, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
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
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
      .times(Mat4.translation(0, 18, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
      .times(Mat4.translation(0, 30, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );
  scene.shapes.box.draw(
    context,
    program_state,
    model_transform
      .times(Mat4.rotation((3 * Math.PI) / 2, 0, 1, 0))
      .times(Mat4.translation(0, 42, -35))
      .times(Mat4.scale(50, 6, 1)),
    scene.shadow_pass ? scene.materials.wall : scene.pure
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
    scene.shadow_pass ? scene.materials.wall : scene.pure
  );

  let t = program_state.animation_time / 1000;
  if (light === true) {
    // console.log("YESSSSSSSS")
    // console.log("YESSSSSSSS")
    // console.log("YESSSSSSSS")
  }

  // Floor
  //scene.shapes.cube.draw(context, program_state, model_transform.times(Mat4.rotation(Math.PI / 2, 1, 0, 0)).times(Mat4.translation(0, 0, 0)).times(Mat4.scale(35, 30, 1)), scene.materials.plastic.override({color: hex_color("#5E5D59")}))
}
