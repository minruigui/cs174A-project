import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

class Cube extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color");
        // Define the positions of the cube outline vertices
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1],
            [1, -1, -1], [1, -1, 1],
            [1, -1, 1], [-1, -1, 1],
            [-1, -1, 1], [-1, -1, -1],
            [-1, 1, -1], [1, 1, -1],
            [1, 1, -1], [1, 1, 1],
            [1, 1, 1], [-1, 1, 1],
            [-1, 1, 1], [-1, 1, -1],
            [-1, -1, -1], [-1, 1, -1],
            [1, -1, -1], [1, 1, -1],
            [1, -1, 1], [1, 1, 1],
            [-1, -1, 1], [-1, 1, 1]
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
            [-1, 1, 1], [1, 1, 1],      // Front-top-left, Front-top-right
            [-1, -1, 1], [1, -1, 1],    // Front-bottom-left, Front-bottom-right
            [1, -1, -1], [1, 1, 1],     // Back-bottom-right, Front-top-right
            [1, 1, -1], [-1, 1, 1],     // Back-top-right, Front-top-left
            [-1, 1, -1], [-1, -1, 1],   // Back-top-left, Front-bottom-left
            [-1, -1, -1], [1, -1, -1],  // Back-bottom-left, Back-bottom-right
            [-1, 1, -1], [1, 1, -1]     // Back-top-left, Back-top-right
        );

        // Calculate the vertex normals
        this.arrays.normal = Vector3.cast(
            [0, 0, 1], [0, 0, 1],       // Front face
            [0, 0, 1], [0, 0, 1],       // Front face
            [1, 0, 0], [1, 0, 0],       // Right face
            [0, 0, -1], [0, 0, -1],     // Back face
            [0, 0, -1], [0, 0, -1],     // Back face
            [-1, 0, 0], [-1, 0, 0],     // Left face
            [0, 1, 0], [0, 1, 0]        // Top face
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
            'cube': new Cube(),
            'outline': new Cube_Outline(),
            'strip': new Cube_Single_Strip()
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                { ambient: .4, diffusivity: .6, color: hex_color("#ffffff") }),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(5, -10, -30));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }
}

export class Assignment2 extends Base_Scene {
    /**
     * This Scene object can be added to any display canvas.
     * We isolate that code so it can be experimented with on its own.
     * This gives you a very small code sandbox for editing a simple scene, and for
     * experimenting with matrix transformations.
     */
    constructor() {
        super();
        this.sway = true;
        this.sway_angle = 0;
        this.n = 8;
        this.colors = []
        for (let i = 0; i < this.n; i++) {
            this.colors.push(color(Math.random(), Math.random(), Math.random(), 1.0))
        }
        this.outline_visible = false;
        // ... rest of the constructor code ...
    }
    set_colors() {
        // TODO:  Create a class member variable to store your cube's colors.
        // Hint:  You might need to create a member variable at somewhere to store the colors, using `this`.
        // Hint2: You can consider add a constructor for class Assignment2, or add member variables in Base_Scene's constructor.
        const colors = []
        for (let i = 0; i < this.n; i++) {
            colors.push(color(Math.random(), Math.random(), Math.random(), 1.0))
        }
        this.colors = colors
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Change Colors", ["c"], this.set_colors);
        // Add a button for controlling the scene.
        this.key_triggered_button("Outline", ["o"], () => {
            // TODO:  Requirement 5b:  Set a flag here that will toggle your outline on and off
            this.outline_visible = !this.outline_visible;
        });
        this.key_triggered_button("Sit still", ["m"], () => {
            this.sway = !this.sway;
            this.sway_angle = 0.05 * Math.PI;
        });
    }

    draw_table(context, program_state, model_transform){
        //TODO
        this.shapes.cube.draw(context,program_state,model_transform.times(Mat4.scale(10,1,20)),this.materials.plastic)
    }

    draw_ball(){
        //TODO
    }

    draw_box(context, program_state, model_transform, i) {
 
        if (this.outline_visible) {
            this.shapes.outline.draw(context, program_state, model_transform.times(Mat4.scale(1,1.5,1)), this.white, "LINES");
        } else {
            if (i % 2 == 1) {
                this.shapes.strip.draw(context, program_state, model_transform.times(Mat4.scale(1,1.5,1)), this.materials.plastic.override({ color: this.colors[i] }), "TRIANGLE_STRIP");
            } else {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1,1.5,1)), this.materials.plastic.override({ color: this.colors[i] }));
            }
        }

        model_transform = model_transform.times(Mat4.translation(0, 3, 0));
        // if(i==1){
        //     blue=hex_color("#ff0000")
        // }
        const t = program_state.animation_time / 2000;

        // Calculate the sway angle based on time and box index
        if (this.sway) {
            this.sway_angle = Math.sin(t * Math.PI) * 0.05 * Math.PI;
            this.sway_angle = Math.abs(this.sway_angle);
        }
        const sway_angle = this.sway_angle;
        if(this.sway_angle>0){
           
            model_transform = model_transform.times(Mat4.translation(-1, -1.5, 0));
            model_transform = model_transform.times(Mat4.rotation(sway_angle, 0, 0, 1));
            // model_transform=model_transform.times(Mat4.scale(1,1.5,1))
            model_transform = model_transform.times(Mat4.translation(1, 1.5, 0));
        }else{
            model_transform = model_transform.times(Mat4.translation(1, -1.5, 0));
            model_transform = model_transform.times(Mat4.rotation(sway_angle, 0, 0, 1));
            model_transform = model_transform.times(Mat4.translation(-1, 1.5, 0));
        }

        



        // model_transform = model_transform.times(Mat4.translation(-1, 0, 0));
        // Apply the translation to align the rotation point with the top-left edge of the box under it
        // // Apply the sway rotation
        // // Apply the translation to position the box correctly
        // // model_transform=model_transform.times(Mat4.translation(0,2,0))X
        // model_transform = model_transform.times(Mat4.translation(1, 0, 0));

        // this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color: blue}));


        return model_transform;
    }

    display(context, program_state) {
        super.display(context, program_state);
        let model_transform = Mat4.identity();
        // Example for drawing a cube, you can remove this line if needed
        // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.
        this.draw_table(context, program_state, model_transform.times(Mat4.translation(0,10,0)))

    }
}