# Protected KAZ NEXT sections

Testimonials, Gameboy, and Panorama are locked to their original implementations
from commit `bab4a04`. Do not redesign, normalize, or alter their content,
controls, animations, assets, typography, spacing, or colors. Scope shared UI
rules to the other sections; never target protected sections from the refinement
stylesheet.

Protected sources include `src/components/ClientTrust.jsx`,
`src/components/ClientTrust.css`, `src/Gameboy.css`, `src/FlankRail.css`,
`src/components/Panoramic3DSection.jsx`, `src/Panoramic3D.css`,
`src/PanoramaRefine.css`, and the Gameboy project data, controls, keyboard logic,
and showcase markup in `src/App.jsx`. Preserve their existing legacy rules in
`src/App.css`, `src/index.css`, and `src/motion.css` as well.

The authorized exception is the full Trust composition in ClientTrust,
including its heading, white principle panel, black proof panel, and three
project-evidence columns. The user explicitly authorized fixing their shared
grid, spacing, alignment, typography hierarchy, and responsive layout. Preserve
all existing content. The section stays white; individual evidence cards turn
black with white content on hover. Other testimonials and protected sections
remain locked; further changes to them require explicit user authorization.
