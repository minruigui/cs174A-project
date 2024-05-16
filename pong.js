import { defs, tiny } from "./examples/common.js";
import { draw_table } from "./table_model.js";
import { Text_Line } from "./examples/text-demo.js";

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
  Texture,
} = tiny;

class Cube extends Shape {
  constructor() {
    super("position", "normal");
    // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
    this.arrays.position = Vector3.cast(
      [-1, -1, -1],
      [1, -1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [1, 1, -1],
      [-1, 1, -1],
      [1, 1, 1],
      [-1, 1, 1],
      [-1, -1, -1],
      [-1, -1, 1],
      [-1, 1, -1],
      [-1, 1, 1],
      [1, -1, 1],
      [1, -1, -1],
      [1, 1, 1],
      [1, 1, -1],
      [-1, -1, 1],
      [1, -1, 1],
      [-1, 1, 1],
      [1, 1, 1],
      [1, -1, -1],
      [-1, -1, -1],
      [1, 1, -1],
      [-1, 1, -1]
    );
    this.arrays.normal = Vector3.cast(
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, -1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [0, 1, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [-1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [1, 0, 0],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, 1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1],
      [0, 0, -1]
    );
    // Arrange the vertices into a square shape in texture space too:
    this.indices.push(
      0,
      1,
      2,
      1,
      3,
      2,
      4,
      5,
      6,
      5,
      7,
      6,
      8,
      9,
      10,
      9,
      11,
      10,
      12,
      13,
      14,
      13,
      15,
      14,
      16,
      17,
      18,
      17,
      19,
      18,
      20,
      21,
      22,
      21,
      23,
      22
    );
  }
}

class Cube_Outline extends Shape {
  constructor() {
    super("position", "color");
    // Define the positions of the cube outline vertices
    this.arrays.position = Vector3.cast(
      [-1, -1, -1],
      [1, -1, -1],
      [1, -1, -1],
      [1, -1, 1],
      [1, -1, 1],
      [-1, -1, 1],
      [-1, -1, 1],
      [-1, -1, -1],
      [-1, 1, -1],
      [1, 1, -1],
      [1, 1, -1],
      [1, 1, 1],
      [1, 1, 1],
      [-1, 1, 1],
      [-1, 1, 1],
      [-1, 1, -1],
      [-1, -1, -1],
      [-1, 1, -1],
      [1, -1, -1],
      [1, 1, -1],
      [1, -1, 1],
      [1, 1, 1],
      [-1, -1, 1],
      [-1, 1, 1]
    );

    // Set each color value to full white
    this.arrays.color = Array(24).fill(color(1, 1, 1, 1));

    // Disable indices for the outline
    this.indices = false;
  }
}

class Cube_Single_Strip extends Shape {
  constructor() {
    super("position", "normal");

    // Define the vertex positions for the triangle strip
    this.arrays.position = Vector3.cast(
      [-1, 1, 1],
      [1, 1, 1], // Front-top-left, Front-top-right
      [-1, -1, 1],
      [1, -1, 1], // Front-bottom-left, Front-bottom-right
      [1, -1, -1],
      [1, 1, 1], // Back-bottom-right, Front-top-right
      [1, 1, -1],
      [-1, 1, 1], // Back-top-right, Front-top-left
      [-1, 1, -1],
      [-1, -1, 1], // Back-top-left, Front-bottom-left
      [-1, -1, -1],
      [1, -1, -1], // Back-bottom-left, Back-bottom-right
      [-1, 1, -1],
      [1, 1, -1] // Back-top-left, Back-top-right
    );

    // Calculate the vertex normals
    this.arrays.normal = Vector3.cast(
      [0, 0, 1],
      [0, 0, 1], // Front face
      [0, 0, 1],
      [0, 0, 1], // Front face
      [1, 0, 0],
      [1, 0, 0], // Right face
      [0, 0, -1],
      [0, 0, -1], // Back face
      [0, 0, -1],
      [0, 0, -1], // Back face
      [-1, 0, 0],
      [-1, 0, 0], // Left face
      [0, 1, 0],
      [0, 1, 0] // Top face
    );

    // Define the indices for the triangle strip
    this.indices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  }
}

class Base_Scene extends Scene {
  /**
   *  **Base_scene** is a Scene that can be added to any display canvas.
   *  Setup the shapes, materials, camera, and lighting here.
   */
  constructor() {
    // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
    super();
    this.hover = this.swarm = false;
    // At the beginning of our program, load one of each of these shape definitions onto the GPU.
    this.shapes = {
      cube: new Cube(),
      outline: new Cube_Outline(),
      strip: new Cube_Single_Strip(),
      ball: new defs.Subdivision_Sphere(4),
      text: new Text_Line(35),
    };

    // *** Materials
    this.materials = {
      plastic: new Material(new defs.Phong_Shader(), {
        ambient: 0.4,
        diffusivity: 0.6,
        color: hex_color("#ffffff"),
      }),
      text: new Material(new defs.Textured_Phong(1), {
        ambient: 1,
        diffusivity: 0,
        specularity: 0,
        texture: new Texture("assets/text.png"),
      }),
    };
    // The white material and basic shader are used for drawing the outline.
    this.white = new Material(new defs.Basic_Shader());
  }

  display(context, program_state) {
    if (!context.scratchpad.controls) {
      this.children.push(
        (context.scratchpad.controls = new defs.Movement_Controls())
      );

      program_state.set_camera(Mat4.translation(0, -18, -40));
    }
    program_state.projection_transform = Mat4.perspective(
      Math.PI / 4,
      context.width / context.height,
      1,
      100
    );

    const light_position = vec4(0, 5, 5, 1);
    program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
  }
}

export class Pong extends Base_Scene {
  constructor() {
    super();

    this.outline_visible = false;
    this.paddle1_transform = Mat4.identity()
      .times(Mat4.translation(0, 11, 19))
      .times(Mat4.scale(1, 0.25, 0.25));
    this.paddle2_transform = Mat4.identity()
      .times(Mat4.translation(0, 11, -19))
      .times(Mat4.scale(1, 0.25, 0.25));
    this.ball_transform = Mat4.identity()
      .times(Mat4.translation(0, 11, 0))
      .times(Mat4.scale(0.25, 0.25, 0.25));

    this.last_prediction_time = 0;
    this.move_paddle2 = true;
    this.left_wall = -10;
    this.right_wall = 10;
    this.back_wall = -20;
    this.front_wall = 20;
    this.ball_direction = Mat4.translation(0, 0, 0);
    this.ball_color = color(1, 0, 0, 1);
    this.player1_score = 0;
    this.player2_score = 0;
    this.ball_speed = 1;
  }

  make_control_panel() {
    this.key_triggered_button("- Ball Speed", ["q"], () => {
      if (this.ball_speed > 0.4) this.ball_speed -= 0.2;
    });
    this.key_triggered_button("+ Ball Speed", ["e"], () => {
      this.ball_speed += 0.2;
    });
    this.key_triggered_button("Start Game", ["Enter"], () => {
      this.start_game();
    });
  }

  draw_ball(context, program_state) {
    // collision with left and right wall
    if (
      this.ball_transform[0][3] <= this.left_wall ||
      this.ball_transform[0][3] >= this.right_wall
    ) {
      this.ball_direction[0][3] = this.ball_direction[0][3  ] * -1;
    }
    // collision with paddles
    if (
      (this.ball_transform[0][3] <= this.paddle1_transform[0][3] + 1 &&
        this.ball_transform[0][3] >= this.paddle1_transform[0][3] - 1 &&
        this.ball_transform[2][3] >= this.paddle1_transform[2][3]) ||
      (this.ball_transform[0][3] <= this.paddle2_transform[0][3] + 1 &&
        this.ball_transform[0][3] >= this.paddle2_transform[0][3] - 1 &&
        this.ball_transform[2][3] <= this.paddle2_transform[2][3])
    ) {
      this.ball_direction[2][3] = this.ball_direction[2][3] * -1;
    }
    // collision with front and back walls
    if (
      this.ball_transform[2][3] >= this.front_wall ||
      this.ball_transform[2][3] <= this.back_wall
    ) {
      if (this.ball_transform[2][3] >= this.front_wall) this.player2_score++;
      else this.player1_score++;

      // restart game
      this.start_game();
    } else this.ball_transform = this.ball_transform.times(this.ball_direction);

    this.shapes.ball.draw(
      context,
      program_state,
      this.ball_transform,
      this.materials.plastic.override({ color: this.ball_color })
    );
  }

  draw_paddle(context, program_state) {
    if (this.paddle2_transform[0][3] < -9) this.paddle2_transform[0][3] = -9;
    else if (this.paddle2_transform[0][3] > 9) this.paddle2_transform[0][3] = 9;
    else if (this.move_paddle2)
      this.paddle2_transform[0][3] = this.ball_transform[0][3];

    this.shapes.cube.draw(
      context,
      program_state,
      this.paddle1_transform,
      this.materials.plastic
    );
    this.shapes.cube.draw(
      context,
      program_state,
      this.paddle2_transform,
      this.materials.plastic
    );
  }

  // tracks cursor position to move paddle
  move_paddle(e) {
    // 1080 x 600 is default window size defined by tinygraphics
    if (e.offsetX >= 540 && e.offsetX <= 1080) {
      if (e.offsetX > 850) this.paddle1_transform[0][3] = (850 - 540) / 35;
      else this.paddle1_transform[0][3] = (e.offsetX - 540) / 35;
    } else if (e.offsetX <= 540)
      if (e.offsetX < 230) this.paddle1_transform[0][3] = (540 - 230) / -35;
      else this.paddle1_transform[0][3] = (540 - e.offsetX) / -35;
  }

  start_game() {
    // reset ball color
    this.ball_color = color(1, 0, 0, 1);
    // reset ball movement
    this.ball_direction = Mat4.translation(0, 0, 0);
    // reset ball position
    this.ball_transform = Mat4.identity()
      .times(Mat4.translation(0, 11, 0))
      .times(Mat4.scale(0.25, 0.25, 0.25));
    // countdown before game start by changing color of ball
    setTimeout(() => {
      this.ball_color = color(1, 1, 0, 1);
      setTimeout(() => {
        this.ball_color = color(0, 1, 0, 1);
        setTimeout(() => {
          this.ball_color = color(1, 1, 1, 1);
          this.ball_direction = Mat4.translation(
            Math.random() * 2 - 1,
            0,
            Math.random() < 0.5 ? this.ball_speed : -this.ball_speed
          );
        }, 800);
      }, 800);
    }, 800);
  }

  display(context, program_state) {
    super.display(context, program_state);
    let model_transform = Mat4.identity();
    let t = program_state.animation_time / 1000;

    // every 2 seconds, perform a coin flip to determine if opponent tracks ball
    if (t - this.last_prediction_time >= 2) {
      this.last_prediction_time = t;
      let coin_flip = Math.random() < 0.3 ? 1 : 0;
      if (coin_flip == 1) this.move_paddle2 = false;
      else this.move_paddle2 = true;
    }

    context.canvas.addEventListener("mousemove", (e) => {
      e.preventDefault();
      this.move_paddle(e);
    });
    draw_table(
      this,
      context,
      program_state,
      model_transform.times(Mat4.translation(0, 10, 0))
    );
    this.draw_ball(context, program_state);
    this.draw_paddle(context, program_state);

    // Display score
    let scoreboard = Mat4.identity().times(Mat4.translation(-15, 30, -30));
    this.shapes.text.set_string(
      "Player 1: " +
        this.player1_score.toString() +
        "  Player 2: " +
        this.player2_score.toString(),
      context.context
    );
    this.shapes.text.draw(
      context,
      program_state,
      scoreboard,
      this.materials.text
    );
  }
}