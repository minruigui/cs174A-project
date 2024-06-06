import { defs, tiny } from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

export function draw_table(scene, context, program_state, model_transform){

    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.scale(10,0.5,20)),scene.materials.plastic.override({color: hex_color("#000000")}))
    //sides
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-10.1,0.5,0)).times(Mat4.scale(0.1,0.5,20)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,20.1)).times(Mat4.scale(10.2,0.5,0.1)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0.5,-20.1)).times(Mat4.scale(10.1,0.5,0.1)),scene.materials.wood)

   
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,-19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(9.5,-5.5,19.5)).times(Mat4.scale(0.5,5,0.5)),scene.materials.wood)

    // lines on table
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,.01,0)).times(Mat4.scale(10,0.5,0.1)),scene.materials.plastic.override({color: color(1,1,1,1)}))


    // scene.shapes.box.draw(context, program_state, Mat4.scale(10, 0.5, 10).times(Mat4.translation(0, 21, 0)), scene.materials.floor);
}

export function draw_room(scene, context, program_state, model_transform){
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,-50)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.floor)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,-30)).times(Mat4.scale(10,0.5,10)),scene.materials.floor)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,-10)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.floor)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,10)).times(Mat4.scale(10,0.5,10)),scene.materials.floor)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,30)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.floor)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,-10,50)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.floor)
    }

   
   
    //walls
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0,-50)).times(Mat4.scale(70,70,0.5)),scene.materials.wall)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,20,-49)).times(Mat4.scale(10,10,0.5)),scene.materials.sky)

    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,0,60)).times(Mat4.scale(70,70,0.5)),scene.materials.wall)

    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(40,0,0)).times(Mat4.scale(0.5,70,70)),scene.materials.wall)
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-40,0,0)).times(Mat4.scale(0.5,70,70)),scene.materials.wall)
    //cells
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,-50)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.wall)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,-30)).times(Mat4.scale(10,0.5,10)),scene.materials.wall)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,-10)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.wall)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,10)).times(Mat4.scale(10,0.5,10)),scene.materials.wall)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,30)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.wall)
    }
    for(let i =0;i<5;i++){
        scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(-50+i*20,50,50)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.wall)
    }
    scene.shapes.box.draw(context,program_state,model_transform.times(Mat4.translation(0,49,0)).times(Mat4.scale(10,0.5,10).times(Mat4.scale(1,1,-1))),scene.materials.metal)

}

const Shadow_Texture_Phong = defs.Shadow_Texture_Phong =
    class Shadow_Texture_Phong extends defs.Textured_Phong {
        vertex_glsl_code() {
            return this.shared_glsl_code() + `
                varying vec2 f_tex_coord;
                varying vec4 f_shadow_coord;
                
                attribute vec3 position, normal;                            
                attribute vec2 texture_coord;
                
                uniform mat4 model_transform;
                uniform mat4 projection_camera_model_transform;
                uniform mat4 light_projection_camera_model_transform;
        
                void main(){                                                                   
                    // The vertex's final resting place (in NDCS):
                    gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                    
                    // The final normal vector in screen space.
                    N = normalize( mat3( model_transform ) * normal / squared_scale);
                    vertex_worldspace = ( model_transform * vec4( position, 1.0 ) ).xyz;
                    
                    // Pass texture coordinates
                    f_tex_coord = texture_coord;

                    // Calculate the position in light space and pass it to the fragment shader
                    f_shadow_coord = light_projection_camera_model_transform * vec4( position, 1.0 );
                }`;
        }
        fragment_glsl_code() {
            return this.shared_glsl_code() + `
                varying vec2 f_tex_coord;
                varying vec4 f_shadow_coord;

                uniform sampler2D texture;
                uniform sampler2D shadow_map;
                uniform float animation_time;
                
                float calculate_shadow(vec4 shadow_coord) {
                    // Perform perspective divide
                    vec3 proj_coords = shadow_coord.xyz / shadow_coord.w;
                    
                    // Transform to [0, 1] range
                    proj_coords = proj_coords * 0.5 + 0.5;
                    
                    // Get closest depth value from light's perspective
                    float closest_depth = texture2D(shadow_map, proj_coords.xy).r;
                    
                    // Get current fragment's depth
                    float current_depth = proj_coords.z;
                    
                    // Check if the current fragment is in shadow
                    float shadow = current_depth > closest_depth + 0.005 ? 0.5 : 1.0;
                    return shadow;
                }

                void main(){
                    // Sample the texture image in the correct place:
                    vec4 tex_color = texture2D( texture, f_tex_coord );
                    if( tex_color.w < .01 ) discard;

                    // Calculate shadow
                    float shadow = calculate_shadow(f_shadow_coord);

                    // Slightly disturb normals based on sampling the same image that was used for texturing:
                    vec3 bumped_N  = N + tex_color.rgb - .5*vec3(1,1,1);

                    // Compute an initial (ambient) color:
                    gl_FragColor = vec4( ( tex_color.xyz + shape_color.xyz ) * ambient * shadow, shape_color.w * tex_color.w ); 

                    // Compute the final color with contributions from lights:
                    gl_FragColor.xyz += phong_model_lights( normalize( bumped_N ), vertex_worldspace ) * shadow;
                }`;
        }

        update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
            super.update_GPU(context, gpu_addresses, gpu_state, model_transform, material);
            // debugger
            context.uniformMatrix4fv(gpu_addresses.light_projection_camera_model_transform, false, 
                Matrix.flatten_2D_to_1D(gpu_state.light_projection_camera_model_transform.transposed()));
            
            if (material.texture && material.texture.ready) {
                context.uniform1i(gpu_addresses.texture, 0);
                material.texture.activate(context);
            }
            if (material.shadow_map && material.shadow_map.ready) {
                context.uniform1i(gpu_addresses.shadow_map, 1);
                material.shadow_map.activate(context, 1);
            }
        }
    }

    export function renderSceneToShadowMap(gl, shadowMap, light_projection_view_matrix, scene) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, shadowMap.framebuffer);
        gl.viewport(0, 0, shadowMap.width, shadowMap.height);
        gl.clear(gl.DEPTH_BUFFER_BIT);
    
        // Render scene with a special shader that only outputs depth values
        scene.draw(gl, light_projection_view_matrix, depth_shader_program);
    
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }


   export class ShadowMap {
        constructor(gl, width = 1024, height = 1024) {
            this.gl = gl;
            this.width = width;
            this.height = height;
    
            this.framebuffer = gl.createFramebuffer();
            this.depthTexture = gl.createTexture();
    
            gl.bindTexture(gl.TEXTURE_2D, this.depthTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT16, width, height, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture, 0);
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }
    }