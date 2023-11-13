void mainImage(out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    // Time varying pixel color
    vec3 col = 0.5 + 0.5*cos(iTime+uv.xyx+vec3(0,2,4));

    // Output to screen
    fragColor = vec4(col,1.0);
    fragColor = uv.xyxy;
    
    // 可以看出 fragCoord 原点在左下角, 这很好, 看来是做了变换的
    float inside = sqrt(fragCoord.x * fragCoord.x + fragCoord.y * fragCoord.y) < 300.0 ? 1.0 : 0.0;
    fragColor = inside > 0.0 ? vec4(1.0) : vec4(0.0);
}