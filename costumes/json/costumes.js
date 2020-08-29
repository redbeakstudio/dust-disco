// Costume registry.

/** Costumes must be:
* Low poly
* GLB 2.0 (not GLTF or GLTF 1.0)
* Under 500KB
* Open license to use (Creative Commons, public domain, etc.) (no commercial)
* Fun!
*/

/** Animated costumes: Creatures of the Dust
* The desert is full of micro-fauna and other creatures surviving the harsh climate.
* Let's be inspired by these creatures & try to load them into our Dust Disco.
* We can try to make some animated GLB files & "play" them
* This is what we are going to try to do with the fairy shrimp & dancing stink bug
* Rough outline of how to do it:
* 1. Create art in Blender
* Use timeline & "actions" to create key-framed animation (or stop motion animation)
* 2. Create with Quill App: Draw & animate art, export to Alembic, import to Blender, export to animated GLB
*/

/**
Costumes will live in our costumes dropbox folder.
"Share" each file & copy the URL into this costume registry file.
*/

const costumes = () => {
  return [
    {
      id: "fairy-shrimp",
      name: "Fairy Shrimp",
      src: "",
    },
    {
      id: "stink-bug",
      name: "Stink Bug",
      src: "",
    },
  ];
};

export default costumes;
