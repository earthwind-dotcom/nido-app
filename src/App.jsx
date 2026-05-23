


import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  ink: "#111010",
  paper: "#f7f5f0",
  warm: "#ede9e1",
  rule: "#d8d3c8",
  muted: "#8a8579",
  accent: "#b85c38",
  accentSoft: "#f2e8e3",
  forest: "#3d5a45",
  forestSoft: "#e8efe9",
  gold: "#9a7c3f",
  goldSoft: "#f5f0e4",
  card: "#ffffff",
  shadow: "0 1px 12px rgba(17,16,16,0.06)",
};
const FD = "'Playfair Display', Georgia, serif";
const FB = "'Libre Baskerville', Georgia, serif";
const FS = "'DM Sans', 'Helvetica Neue', sans-serif";
const FM = "'DM Mono', 'Courier New', monospace";

// ─── THEOLOGICAL EPIGRAPHS ────────────────────────────────────────────────────
const EPIGRAPHS = {
  casa: { quote: "The home is not a refuge from the world but a place where the world can be received with open hands.", author: "Henri Nouwen" },
  laundry: { quote: "In the rhythm of ordinary tasks, we are invited to discover the sacred hiding in plain sight.", author: "Thomas à Kempis, adapted" },
  cocina: { quote: "To prepare food for another is to say: your life matters. Your hunger matters. You matter.", author: "Henri Nouwen" },
  birdie: { quote: "We do not own the creatures entrusted to us. We steward them.", author: "Francis of Assisi, tradition" },
  plantas: { quote: "Tending to living things is a form of prayer — attention paid to something outside ourselves.", author: "Wendell Berry" },
  salir: { quote: "Solitude is not a private therapeutic place. Rather, it is the place of conversion.", author: "Henri Nouwen, Reaching Out" },
  inversiones: { quote: "Ordered space shapes ordered thought. What we build around ourselves, we eventually become.", author: "Dietrich Bonhoeffer" },
  compras: { quote: "Simplicity is not poverty. It is clarity about what sustains life and what merely distracts from it.", author: "Richard Foster" },
};

// ─── CLEANING DATA — WHITE HOUSE PROTOCOL LEVEL ───────────────────────────────
const ZONES = [
  {
    id: "entrada", label: { es: "Entrada", en: "Entry" }, floor: "wood",
    tasks: [
      { id: "en1", es: "Barrer piso de madera", en: "Sweep hardwood floor", freq: "2x/semana", product: { es: "Escoba de cerdas suaves. Nunca escoba dura en madera.", en: "Soft-bristle broom. Never stiff bristles on hardwood." } },
      { id: "en2", es: "Trapear con mopa casi seca", en: "Damp-mop — barely wet", freq: "semanal", product: { es: "Bona Hardwood Cleaner. Mopa de microfibra. El exceso de agua destruye la madera.", en: "Bona Hardwood Cleaner. Microfiber mop. Excess water destroys wood." } },
      { id: "en3", es: "Limpiar puerta principal — interior", en: "Clean front door — interior", freq: "semanal", product: { es: "Paño húmedo con jabón Castile. Incluir el marco, bisagras y manija.", en: "Damp cloth with Castile soap. Include frame, hinges, and handle." } },
      { id: "en4", es: "Limpiar puerta principal — exterior", en: "Clean front door — exterior", freq: "mensual", product: { es: "All-purpose cleaner. Incluir mirilla, buzón, números de casa.", en: "All-purpose cleaner. Include peephole, mailbox, house numbers." } },
      { id: "en5", es: "Sacudir y lavar tapete de entrada", en: "Shake and wash entry mat", freq: "semanal", product: { es: "Sacudir afuera, lavar si es lavable en ciclo normal.", en: "Shake outside, machine wash if washable on normal cycle." } },
      { id: "en6", es: "Limpiar interruptores de luz", en: "Clean light switches", freq: "semanal", product: { es: "Toallita desinfectante o alcohol 70%. Los interruptores son los más tocados de la casa.", en: "Disinfecting wipe or 70% alcohol. Switches are the most-touched surface in any home." } },
    ],
    abuela: { es: "Pon una ramita de romero seco en la entrada — aleja malas energías y huele a hogar limpio.", en: "Place a dried rosemary sprig at the entry — wards off bad energy and smells like a clean home." },
    smell: { es: "Un difusor con eucalipto en la entrada es lo primero que siente quien llega. Define el tono del hogar entero.", en: "A eucalyptus diffuser at the entry is the first thing guests sense. It sets the tone for the whole home." },
  },
  {
    id: "sala", label: { es: "Sala", en: "Living Room" }, floor: "wood",
    tasks: [
      { id: "s1", es: "Barrer piso de madera", en: "Sweep hardwood floor", freq: "2x/semana", product: { es: "Escoba suave. Mueve los muebles cada dos semanas para barrer debajo.", en: "Soft broom. Move furniture every two weeks to sweep underneath." } },
      { id: "s2", es: "Trapear piso de madera", en: "Mop hardwood floor", freq: "semanal", product: { es: "Bona o Castile diluido. Mopa casi seca. Secar bien.", en: "Bona or diluted Castile. Nearly-dry mop. Dry thoroughly." } },
      { id: "s3", es: "Aspirar debajo de muebles", en: "Vacuum under furniture", freq: "mensual", product: { es: "Aspiradora con accesorio plano. Debajo del sofá acumula más polvo que cualquier otra zona.", en: "Vacuum with flat attachment. Under the sofa accumulates more dust than anywhere else." } },
      { id: "s4", es: "Quitar polvo — superficies y muebles", en: "Dust surfaces and furniture", freq: "semanal", product: { es: "Paño de microfibra húmedo. De arriba hacia abajo, siempre.", en: "Damp microfiber cloth. Always top-to-bottom." } },
      { id: "s5", es: "Limpiar ventanas — interior", en: "Clean windows — interior", freq: "semanal", product: { es: "Windex o vinagre + agua en spray. Papel periódico en vez de papel toalla — no deja pelusa.", en: "Windex or vinegar + water spray. Newspaper instead of paper towel — no lint." } },
      { id: "s6", es: "Limpiar ventanas — exterior", en: "Clean windows — exterior", freq: "mensual", product: { es: "Squeegee + solución jabonosa. Mejor hacerlo nublado — el sol directo seca rápido y deja manchas.", en: "Squeegee + soapy solution. Best done on cloudy days — direct sun dries too fast and leaves streaks." } },
      { id: "s7", es: "Limpiar marcos de ventanas y rieles", en: "Clean window frames and tracks", freq: "mensual", product: { es: "Cepillo viejo + vinagre para rieles. Los rieles acumulan tierra que nadie limpia.", en: "Old toothbrush + vinegar for tracks. Tracks accumulate dirt nobody cleans." } },
      { id: "s8", es: "Limpiar cortinas o persianas", en: "Clean curtains or blinds", freq: "mensual", product: { es: "Persianas: paño húmedo por cada lámina. Cortinas: ciclo delicado o sacudir y airear.", en: "Blinds: damp cloth on each slat. Curtains: delicate cycle or shake and air out." } },
      { id: "s9", es: "Limpiar paredes — manchas visibles", en: "Spot-clean walls", freq: "mensual", product: { es: "Esponja mágica (Magic Eraser) húmeda para manchas. Para paredes pintadas: paño con agua tibia y una gota de jabón.", en: "Damp Magic Eraser for scuffs. For painted walls: cloth with warm water and one drop of soap." } },
      { id: "s10", es: "Limpiar puertas interiores y marcos", en: "Clean interior doors and frames", freq: "mensual", product: { es: "Paño húmedo, incluir la parte alta del marco donde acumula polvo invisible.", en: "Damp cloth, include top of door frame where invisible dust accumulates." } },
      { id: "s11", es: "Limpiar zócalos / rodapiés", en: "Clean baseboards", freq: "mensual", product: { es: "Paño húmedo de arriba hacia abajo. Luego pasar paño seco. Los blancos se notan mucho.", en: "Damp cloth top to bottom. Follow with dry cloth. White ones show everything." } },
      { id: "s12", es: "Lavar cobija del sofá", en: "Wash sofa throw", freq: "mensual", product: { es: "Ciclo delicado, agua fría. Secar en baja temperatura o airear.", en: "Delicate cycle, cold water. Low-heat dry or air dry." } },
      { id: "s13", es: "Limpiar techo — esquinas y ventiladores", en: "Clean ceiling — corners and fans", freq: "trimestral", product: { es: "Mopa larga o plumero extendido. Las aspas del ventilador acumulan grasa y polvo combinados.", en: "Long mop or extended duster. Fan blades accumulate combined grease and dust." } },
    ],
    abuela: { es: "Para quitar manchas en la pared: bicarbonato + unas gotas de agua, talla suave. Sale casi todo sin dañar la pintura.", en: "To remove wall scuffs: baking soda + a few drops of water, gentle scrub. Removes almost everything without damaging paint." },
    smell: { es: "Bicarbonato en un tazón abierto debajo del sofá absorbe olores sin perfumar. Para aromatizar: difusor con cedro o sándalo.", en: "Open baking soda bowl under the sofa absorbs odors without fragrance. To scent: diffuser with cedar or sandalwood." },
  },
  {
    id: "cocina_clean", label: { es: "Cocina", en: "Kitchen" }, floor: "wood",
    tasks: [
      { id: "kc1", es: "Limpiar encimeras", en: "Wipe countertops", freq: "diario", product: { es: "Spray de vinagre 1:1 + paño de microfibra. Mover todo lo que hay encima.", en: "Vinegar 1:1 spray + microfiber cloth. Move everything on top." } },
      { id: "kc2", es: "Limpiar estufa — quemadores y superficie", en: "Clean stove — burners and surface", freq: "diario", product: { es: "Bicarbonato + vinagre para grasa cocida. Dejar actuar 5 min antes de tallar.", en: "Baking soda + vinegar for cooked grease. Let sit 5 min before scrubbing." } },
      { id: "kc3", es: "Barrer piso de madera", en: "Sweep hardwood floor", freq: "diario", product: { es: "La cocina acumula grasa + polvo. Barrer diario es no negociable.", en: "Kitchen accumulates grease + dust. Daily sweeping is non-negotiable." } },
      { id: "kc4", es: "Trapear piso", en: "Mop floor", freq: "semanal", product: { es: "Castile + agua tibia. Secar bien — la grasa de cocina se deposita en el piso.", en: "Castile + warm water. Dry well — cooking grease settles on the floor." } },
      { id: "kc5", es: "Lavar sink / fregadero completo", en: "Scrub sink completely", freq: "2x/semana", product: { es: "Bicarbonato + vinagre. Incluir la coladera, el grifo y la base. El fregadero tiene más bacterias que el baño.", en: "Baking soda + vinegar. Include the drain, faucet, and base. The sink has more bacteria than the toilet." } },
      { id: "kc6", es: "Limpiar microondas — interior y exterior", en: "Clean microwave — inside and out", freq: "semanal", product: { es: "Tazón con agua + limón al microondas 2 min, el vapor afloja todo. Limpiar inmediatamente.", en: "Bowl of water + lemon in microwave 2 min, steam loosens everything. Wipe immediately." } },
      { id: "kc7", es: "Limpiar refrigerador — exterior", en: "Clean fridge — exterior", freq: "semanal", product: { es: "Paño húmedo con agua tibia. Incluir manijas y laterales. Las huellas digitales son constantes.", en: "Damp cloth with warm water. Include handles and sides. Fingerprints are constant." } },
      { id: "kc8", es: "Organizar y limpiar refrigerador — interior", en: "Organize and clean fridge — inside", freq: "mensual", product: { es: "Bicarbonato + agua tibia. Sacar todo, limpiar repisas, revisar fechas. Un cajón de verduras limpio es salud.", en: "Baking soda + warm water. Remove everything, clean shelves, check dates." } },
      { id: "kc9", es: "Limpiar horno — interior", en: "Clean oven — inside", freq: "mensual", product: { es: "Pasta de bicarbonato + agua, dejar toda la noche. Al día siguiente, vinagre para quitar el bicarbonato. Sin químicos fuertes.", en: "Baking soda + water paste, leave overnight. Next day, vinegar to remove residue. No harsh chemicals." } },
      { id: "kc10", es: "Organizar condimentos y especias", en: "Organize condiments and spices", freq: "mensual", product: { es: "Revisar fechas de expiración. Limpiar los frascos por fuera — la grasa se acumula invisible.", en: "Check expiration dates. Wipe jars on the outside — grease accumulates invisibly." } },
      { id: "kc11", es: "Organizar cajón de utensilios", en: "Organize utensil drawer", freq: "mensual", product: { es: "Sacar todo, limpiar el cajón, descartar lo que no se usa. Un cajón ordenado es 30 segundos menos de frustración diaria.", en: "Remove everything, clean the drawer, discard unused items." } },
      { id: "kc12", es: "Limpiar campana extractora", en: "Clean range hood", freq: "mensual", product: { es: "Filtros de la campana: agua caliente + desgrasante o bicarbonato. La grasa acumulada es un riesgo de incendio.", en: "Hood filters: hot water + degreaser or baking soda. Grease buildup is a fire risk." } },
      { id: "kc13", es: "Limpiar paredes y salpicadero", en: "Clean walls and backsplash", freq: "mensual", product: { es: "Desengrasante + esponja. Las paredes detrás de la estufa acumulan grasa invisible.", en: "Degreaser + sponge. Walls behind the stove accumulate invisible grease." } },
      { id: "kc14", es: "Limpiar zócalos de la cocina", en: "Clean kitchen baseboards", freq: "mensual", product: { es: "Paño con desengrasante. La grasa de cocinar se deposita en los rodapiés y nadie lo nota hasta que lo ves.", en: "Cloth with degreaser. Cooking grease settles on baseboards and nobody notices until they do." } },
    ],
    abuela: { es: "Para el olor a fritanga: hierve agua con clavos de olor y canela en rama. Neutraliza en minutos, sin químicos.", en: "For cooking smells: simmer water with whole cloves and cinnamon stick. Neutralizes in minutes, no chemicals." },
    smell: { es: "Mitad de limón en el fregadero después de cada lavada de trastes. O cáscara de naranja en el cubo de basura.", en: "Half a lemon in the sink after washing dishes. Or orange peel in the trash bin." },
  },
  {
    id: "bano", label: { es: "Baño", en: "Bathroom" }, floor: "tile",
    tasks: [
      { id: "ba1", es: "Lavar el lavamanos — completo", en: "Scrub the sink — completely", freq: "2x/semana", product: { es: "Bicarbonato + vinagre. Incluir grifo, base, y la parte de atrás del grifo donde nadie limpia.", en: "Baking soda + vinegar. Include faucet, base, and back of faucet where nobody cleans." } },
      { id: "ba2", es: "Desinfectar la regadera / tina", en: "Disinfect shower / tub", freq: "semanal", product: { es: "Vinagre blanco spray para manchas de agua dura. Cepillo para esquinas. Dejar actuar 10 min.", en: "White vinegar spray for hard water stains. Brush for corners. Let sit 10 min." } },
      { id: "ba3", es: "Limpiar las paredes de la regadera", en: "Clean shower walls", freq: "semanal", product: { es: "Spray de vinagre diluido. Jalador después de cada ducha evita manchas de agua. Transforma el mantenimiento.", en: "Diluted vinegar spray. A squeegee after every shower prevents water stains entirely." } },
      { id: "ba4", es: "Limpiar la coladera / desagüe", en: "Clean the drain", freq: "semanal", product: { es: "Bicarbonato + agua hirviendo. Luego vinagre. Previene olores y obstrucciones.", en: "Baking soda + boiling water. Then vinegar. Prevents odors and clogs." } },
      { id: "ba5", es: "Limpiar la taza — interior", en: "Clean toilet bowl — inside", freq: "semanal", product: { es: "Cloro diluido o pastilla de inodoro. Cepillo con movimiento de adentro hacia afuera.", en: "Diluted bleach or toilet tab. Brush from inside out." } },
      { id: "ba6", es: "Desinfectar la taza — exterior completo", en: "Disinfect toilet — full exterior", freq: "semanal", product: { es: "Toallitas desinfectantes. La parte trasera, la base, y el espacio entre la taza y el piso son los más descuidados.", en: "Disinfecting wipes. The back, base, and gap between toilet and floor are the most neglected." } },
      { id: "ba7", es: "Limpiar espejo", en: "Clean mirror", freq: "semanal", product: { es: "Vinagre + agua + papel periódico. El periódico no deja pelusa. Truco de abuela que funciona mejor que cualquier producto.", en: "Vinegar + water + newspaper. Newspaper leaves no lint. Grandma's trick that beats any product." } },
      { id: "ba8", es: "Trapear el piso", en: "Mop the floor", freq: "semanal", product: { es: "Pine-Sol o cloro diluido. El piso del baño es el de mayor carga bacteriana de la casa.", en: "Pine-Sol or diluted bleach. Bathroom floor has the highest bacterial load in the home." } },
      { id: "ba9", es: "Limpiar paredes del baño", en: "Clean bathroom walls", freq: "mensual", product: { es: "Paño húmedo con jabón. Las paredes cercanas a la regadera acumulan salpicaduras invisibles.", en: "Damp cloth with soap. Walls near the shower accumulate invisible splatter." } },
      { id: "ba10", es: "Limpiar el techo del baño", en: "Clean bathroom ceiling", freq: "mensual", product: { es: "Paño en mopa larga con agua tibia. El vapor de la ducha sube y se deposita. Previene moho.", en: "Cloth on long mop with warm water. Shower steam rises and deposits. Prevents mold." } },
      { id: "ba11", es: "Lavar cortina o puerta de regadera", en: "Wash shower curtain or door", freq: "mensual", product: { es: "Cortina: ciclo normal con un poco de vinagre. Puerta de vidrio: pasta de bicarbonato, dejar 15 min, enjuagar.", en: "Curtain: normal cycle with a splash of vinegar. Glass door: baking soda paste, 15 min, rinse." } },
      { id: "ba12", es: "Limpiar ventilador de extracción", en: "Clean exhaust fan", freq: "trimestral", product: { es: "Aspiradora en la rejilla primero. Luego paño húmedo. El polvo acumulado causa incendios y no extrae bien.", en: "Vacuum the grate first. Then damp cloth. Accumulated dust causes fires and reduces effectiveness." } },
      { id: "ba13", es: "Revisar y limpiar junta de silicón", en: "Check and clean silicone grout", freq: "trimestral", product: { es: "Vinagre + cepillo de dientes viejo para las juntas negras. El moho negro en las juntas es el enemigo #1.", en: "Vinegar + old toothbrush for black grout. Black mold in grout is enemy #1." } },
    ],
    abuela: { es: "Limón partido + sal gruesa para limpiar la llave y el grifo: quita el sarro sin rayar. Sale brillante como nuevo.", en: "Cut lemon + coarse salt on the faucet: removes limescale without scratching. Comes out shining." },
    smell: { es: "Unas gotas de aceite esencial de árbol de té en el rollo de papel de baño. Cada jalón suelta un poco de aroma y también es antimicrobiano.", en: "A few drops of tea tree oil on the toilet paper roll. Each pull releases a little fragrance — also antimicrobial." },
  },
  {
    id: "cuarto", label: { es: "Cuarto", en: "Bedroom" }, floor: "carpet",
    tasks: [
      { id: "cu1", es: "Hacer la cama", en: "Make the bed", freq: "diario", product: { es: "No hay truco. Transforma el cuarto en 90 segundos.", en: "No trick. It transforms the room in 90 seconds." } },
      { id: "cu2", es: "Aspirar alfombra", en: "Vacuum carpet", freq: "semanal", product: { es: "Bicarbonato sobre la alfombra 15 min antes — absorbe olores. Luego aspirar. Mueve la cama una vez al mes.", en: "Baking soda on carpet 15 min before — absorbs odors. Then vacuum. Move the bed once a month." } },
      { id: "cu3", es: "Lavar sábanas", en: "Wash sheets", freq: "2 semanas", product: { es: "Agua caliente. Siempre separado de ropa de color. Los ácaros mueren arriba de 60°C.", en: "Hot water. Always separate from colored clothes. Dust mites die above 60°C / 140°F." } },
      { id: "cu4", es: "Lavar fundas de almohada", en: "Wash pillowcases", freq: "semanal", product: { es: "Agua caliente. Tu cara pasa 8 horas ahí. La funda limpia es salud de piel directa.", en: "Hot water. Your face is there 8 hours. A clean pillowcase is direct skin health." } },
      { id: "cu5", es: "Quitar polvo — muebles y superficies", en: "Dust furniture and surfaces", freq: "semanal", product: { es: "Paño de microfibra húmedo. Incluir la parte de arriba del clóset y marcos de cuadros.", en: "Damp microfiber cloth. Include top of closet and picture frames." } },
      { id: "cu6", es: "Limpiar ventanas y marcos", en: "Clean windows and frames", freq: "mensual", product: { es: "Vinagre + agua. Incluir los rieles donde acumula tierra.", en: "Vinegar + water. Include the tracks where dirt accumulates." } },
      { id: "cu7", es: "Limpiar paredes — manchas y zócalos", en: "Spot-clean walls and baseboards", freq: "mensual", product: { es: "Magic Eraser para manchas. Paño húmedo para zócalos.", en: "Magic Eraser for scuffs. Damp cloth for baseboards." } },
      { id: "cu8", es: "Limpiar puertas y marcos", en: "Clean doors and frames", freq: "mensual", product: { es: "Paño húmedo con jabón. La parte alta del marco acumula polvo invisible.", en: "Damp cloth with soap. The top of the door frame collects invisible dust." } },
    ],
    abuela: { es: "Bicarbonato sobre la alfombra y déjalo toda la noche si puedes. Al día siguiente aspira. Quita olores profundos que el perfume solo tapa.", en: "Baking soda on the carpet overnight if you can. Vacuum next day. Removes deep odors that fragrance only masks." },
    smell: { es: "Lavanda seca en cajones de ropa. Un sachet bajo la almohada. O simplemente airear el cuarto 10 minutos cada mañana — el aire fresco de Montana hace más que cualquier difusor.", en: "Dried lavender in clothes drawers. A sachet under the pillow. Or simply air the room 10 minutes every morning — Montana fresh air does more than any diffuser." },
  },
  {
    id: "porch", label: { es: "Porch / Exterior", en: "Porch / Exterior" }, floor: "outdoor",
    tasks: [
      { id: "po1", es: "Barrer el porch", en: "Sweep the porch", freq: "semanal", product: { es: "Escoba exterior. En otoño e invierno en Montana: diario si hay nieve o hojas.", en: "Outdoor broom. Montana fall/winter: daily if snow or leaves." } },
      { id: "po2", es: "Lavar el porch con manguera", en: "Hose down the porch", freq: "mensual", product: { es: "Manguera + cepillo de cerdas duras. Jabón de lavanda o all-purpose diluido.", en: "Hose + stiff-bristle brush. Lavender soap or diluted all-purpose cleaner." } },
      { id: "po3", es: "Limpiar muebles de exterior", en: "Clean outdoor furniture", freq: "mensual", product: { es: "Paño con agua jabonosa. Revisar si necesitan sellador o pintura al inicio de primavera.", en: "Cloth with soapy water. Check if they need sealant or paint at the start of spring." } },
      { id: "po4", es: "Limpiar ventanas exteriores", en: "Clean exterior windows", freq: "mensual", product: { es: "Squeegee + agua jabonosa. Hacerlo nublado para evitar secado rápido con manchas.", en: "Squeegee + soapy water. Overcast day to prevent quick drying with streaks." } },
      { id: "po5", es: "Limpiar canaletas / gutters", en: "Clear gutters", freq: "2x/año", product: { es: "Guantes + escalera. Otoño (hojas) y primavera (deshielo). En Montana es crítico.", en: "Gloves + ladder. Fall (leaves) and spring (snowmelt). Critical in Montana." } },
      { id: "po6", es: "Lavar el carro — exterior", en: "Wash car — exterior", freq: "semanal", product: { es: "Jabón específico para autos. Nunca jabón de platos — daña la pintura. Microfibra para secar.", en: "Car-specific soap. Never dish soap — damages paint. Microfiber to dry." } },
      { id: "po7", es: "Limpiar interior del carro", en: "Clean car interior", freq: "mensual", product: { es: "Aspiradora + paño de microfibra. Armorall para tablero. Montana: sal de invierno en tapetes — aspirar frecuente.", en: "Vacuum + microfiber cloth. Armorall for dashboard. Montana: winter salt on mats — vacuum frequently." } },
      { id: "po8", es: "Lavar tapetes del carro", en: "Wash car floor mats", freq: "mensual", product: { es: "Agua + cepillo + jabón. Secar completamente antes de regresar al carro.", en: "Water + brush + soap. Dry completely before returning to car." } },
    ],
    abuela: { es: "Para limpiar el porch con mal olor: agua caliente + unas gotas de cloro + una cáscara de naranja en el balde. Desinfecta y huele a limpio real.", en: "For a smelly porch: hot water + a few drops of bleach + orange peel in the bucket. Disinfects and smells genuinely clean." },
    smell: { es: "No hay olor más honesto que un porch barrido. En Montana, el aire fresco lo hace todo.", en: "There is no more honest smell than a swept porch. In Montana, fresh air does everything." },
  },
  {
    id: "birdie_zone", label: { es: "Zona Birdie", en: "Birdie's Zone" }, floor: "mixed",
    tasks: [
      { id: "bz1", es: "Limpiar donde Birdie camina — vinagre diluido", en: "Clean Birdie's walking surfaces — diluted vinegar", freq: "2x/semana", product: { es: "Vinagre blanco 1:1 con agua. Seguro para reptiles. Nunca cloro, nunca perfumes.", en: "White vinegar 1:1 with water. Safe for reptiles. Never bleach, never fragrances." } },
      { id: "bz2", es: "Limpiar terrario completo", en: "Clean full terrarium", freq: "semanal", product: { es: "Vinagre diluido para todas las superficies. Sacar a Birdie primero.", en: "Diluted vinegar on all surfaces. Remove Birdie first." } },
      { id: "bz3", es: "Cambiar sustrato", en: "Change substrate", freq: "semanal", product: { es: "Papel kraft o periódico. Simple, económico, fácil de ver si hay deposiciones.", en: "Kraft paper or newspaper. Simple, affordable, easy to spot waste." } },
    ],
    abuela: { es: "Bicarbonato abierto cerca del terrario (nunca dentro) — absorbe el olor de reptil sin dañarla.", en: "Open baking soda near the terrarium (never inside) — absorbs reptile odor without harming her." },
    smell: { es: "Ventilar el cuarto de Birdie 10 minutos al día. El vinagre neutraliza sin perfumes que la puedan dañar.", en: "Ventilate Birdie's room 10 minutes daily. Vinegar neutralizes without fragrances that could harm her." },
  },
];

// ─── LAUNDRY DATA ─────────────────────────────────────────────────────────────
const LAUNDRY_TASKS = [
  { id: "l1", es: "Lavar blancos — agua caliente, separados", en: "Wash whites — hot water, separate", freq: "semanal", product: { es: "Agua caliente + detergente + un chorrito de vinagre blanco (en vez de suavizante). Los blancos con blancos, siempre.", en: "Hot water + detergent + splash of white vinegar (instead of fabric softener). Whites with whites, always." } },
  { id: "l2", es: "Lavar ropa de color — agua fría", en: "Wash colored clothes — cold water", freq: "semanal", product: { es: "Agua fría preserva los colores. Ciclo normal. Voltear las prendas de colores antes de lavar.", en: "Cold water preserves colors. Normal cycle. Turn colored garments inside out before washing." } },
  { id: "l3", es: "Lavar delicados — ciclo delicado o a mano", en: "Wash delicates — delicate cycle or hand wash", freq: "según necesidad", product: { es: "Agua fría + detergente delicado (Woolite). A mano para lo más frágil. Nunca centrifugado fuerte.", en: "Cold water + delicate detergent (Woolite). Hand wash the most fragile. Never high spin." } },
  { id: "l4", es: "Colgar prendas a secar — no secadora", en: "Hang garments to dry — no dryer", freq: "según necesidad", product: { es: "Lo que diga 'lay flat to dry' o tiene spandex / lycra: no va a secadora. El calor destruye la elasticidad.", en: "Anything labeled 'lay flat to dry' or containing spandex/lycra: no dryer. Heat destroys elasticity." } },
  { id: "l5", es: "Limpiar filtro de pelusa — CADA carga", en: "Clean lint trap — EVERY load", freq: "cada carga", product: { es: "Vaciar completamente. El filtro sucio es la causa #1 de incendios en secadoras. 30 segundos.", en: "Empty completely. Clogged lint trap is the #1 cause of dryer fires. 30 seconds." } },
  { id: "l6", es: "Doblar y guardar — el mismo día", en: "Fold and put away — same day", freq: "cada carga", product: { es: "La ropa no está 'lista' hasta que está guardada. Doblada en canasta = no terminado.", en: "Laundry is not 'done' until it is put away. Folded in a basket = not done." } },
  { id: "l7", es: "Limpiar tambor de lavadora", en: "Clean washer drum", freq: "mensual", product: { es: "Ciclo vacío con agua caliente + 2 tazas de vinagre blanco. Elimina moho y olor a humedad.", en: "Empty cycle with hot water + 2 cups white vinegar. Eliminates mold and musty smell." } },
  { id: "l8", es: "Lavar toallas de baño", en: "Wash bath towels", freq: "semanal", product: { es: "Agua caliente + vinagre en lugar de suavizante. El suavizante reduce la absorción de la toalla con el tiempo.", en: "Hot water + vinegar instead of fabric softener. Softener reduces towel absorbency over time." } },
  { id: "l9", es: "Cambiar toalla de mano", en: "Replace hand towel", freq: "cada 3 días", product: { es: "La toalla de mano es la más contaminada de la casa. Más frecuente de lo que parece necesario.", en: "Hand towels are the most contaminated textile in the home. More frequent than it seems necessary." } },
  { id: "l10", es: "Lavar sábanas", en: "Wash bed sheets", freq: "cada 2 semanas", product: { es: "Agua caliente. Los ácaros del polvo mueren a 60°C. Fundas de almohada: semanal.", en: "Hot water. Dust mites die at 60°C / 140°F. Pillowcases: weekly." } },
  { id: "l11", es: "Revisar etiquetas antes de lavar prendas nuevas", en: "Check labels before washing new garments", freq: "cada nueva prenda", product: { es: "Una prenda arruinada en secadora no se repara. 10 segundos de leer la etiqueta lo previenen.", en: "A garment ruined in the dryer cannot be fixed. 10 seconds reading the label prevents it." } },
];

// ─── DISHES DATA ──────────────────────────────────────────────────────────────
const DISHES_TASKS = [
  { id: "d1", es: "Lavar trastes al momento — no dejar en el fregadero", en: "Wash dishes immediately — don't let them sit", tip: { es: "Los trastes en el fregadero son la fuente de bacterias más normalizada en la cocina. Lavar al momento cambia el ambiente mental de toda la cocina.", en: "Dishes in the sink are the most normalized bacteria source in the kitchen. Washing immediately changes the mental atmosphere of the whole kitchen." } },
  { id: "d2", es: "Limpiar las esponjas o cambiarlas", en: "Clean or replace sponges", freq: "semanal", tip: { es: "La esponja es el objeto más contaminado de la casa. Microndar húmeda 1 min o sumergir en agua con cloro diluido. Cambiar cada semana.", en: "The kitchen sponge is the most contaminated object in the home. Microwave wet for 1 min or soak in diluted bleach. Replace weekly." } },
  { id: "d3", es: "Desinfectar tablas de cortar", en: "Disinfect cutting boards", freq: "después de cada uso con carne", tip: { es: "Tabla de madera: sal gruesa + limón, tallar, enjuagar. Plástico: lavar con agua caliente y jabón + solución de cloro diluida.", en: "Wooden board: coarse salt + lemon, scrub, rinse. Plastic: hot water and soap + diluted bleach solution." } },
  { id: "d4", es: "Organizar cajón de utensilios", en: "Organize utensil drawer", freq: "mensual", tip: { es: "Descartar lo duplicado, lo roto, lo que no se usa. Un cajón organizado tarda 3 min en limpiarse vs 15 de uno caótico.", en: "Discard duplicates, broken items, unused ones. An organized drawer takes 3 min to clean vs 15 for a chaotic one." } },
  { id: "d5", es: "Revisar y organizar condimentos", en: "Check and organize condiments", freq: "mensual", tip: { es: "Expiración, manchas externas, agrupación lógica (ácidos juntos, dulces juntos). Limpiar los frascos por fuera.", en: "Expiration, exterior stains, logical grouping (acids together, sweets together). Wipe jars on the outside." } },
];

// ─── RECIPES ──────────────────────────────────────────────────────────────────
const RECIPES = [
  { id: "r1", name: { es: "Bowl de Salmón y Quinoa", en: "Salmon & Quinoa Bowl" }, tags: ["hígado graso", "fitness"], time: "30 min", ingredients: ["salmón", "quinoa", "espinaca", "aguacate", "limón", "ajo", "aceite de oliva"], steps: { es: ["Cocina quinoa en agua con sal, 15 min.", "Sazona salmón: ajo, limón, sal, pimienta.", "Sella 4 min por lado en sartén caliente.", "Bowl: quinoa base, espinaca, salmón encima.", "Aguacate, chorrito de limón, aceite de oliva."], en: ["Cook quinoa in salted water, 15 min.", "Season salmon: garlic, lemon, salt, pepper.", "Sear 4 min per side in hot pan.", "Bowl: quinoa base, spinach, salmon on top.", "Avocado, lemon drizzle, olive oil."] }, note: { es: "Omega-3 del salmón reduce directamente la inflamación hepática. Para NAFLD, este plato 2x/semana tiene evidencia clínica.", en: "Salmon's omega-3 directly reduces hepatic inflammation. For NAFLD, this dish 2x/week has clinical evidence." } },
  { id: "r2", name: { es: "Tacos de Pollo a la Plancha", en: "Grilled Chicken Tacos" }, tags: ["fitness", "proteína"], time: "25 min", ingredients: ["pollo", "tortillas de maíz", "limón", "cilantro", "cebolla", "salsa verde", "comino"], steps: { es: ["Marina pollo: ajo, limón, comino, sal — 15 min.", "Asa 6-7 min por lado.", "Calienta tortillas de maíz en comal seco.", "Arma con cilantro, cebolla, salsa verde.", "Limón al final."], en: ["Marinate chicken: garlic, lemon, cumin, salt — 15 min.", "Grill 6-7 min per side.", "Warm corn tortillas on dry comal.", "Top with cilantro, onion, salsa verde.", "Lemon at the end."] }, note: { es: "Proteína magra + fibra de tortilla de maíz. Evitar tortilla de harina — mayor índice glucémico.", en: "Lean protein + corn tortilla fiber. Avoid flour tortilla — higher glycemic index." } },
  { id: "r3", name: { es: "Avena Overnight", en: "Overnight Oats" }, tags: ["desayuno", "rápido"], time: "5 min + noche", ingredients: ["avena", "leche de almendra", "chía", "plátano", "miel", "fresas"], steps: { es: ["Mezcla avena + leche + chía + miel en frasco.", "Refrigera toda la noche.", "Mañana: fresas + plátano encima."], en: ["Mix oats + milk + chia + honey in jar.", "Refrigerate overnight.", "Morning: add strawberries + banana on top."] }, note: { es: "Fibra soluble de avena reduce colesterol LDL. Para hígado graso: evitar el café solo en ayunas antes de este desayuno.", en: "Oat soluble fiber reduces LDL cholesterol. For fatty liver: avoid black coffee on an empty stomach before this breakfast." } },
  { id: "r4", name: { es: "Ensalada de Atún y Garbanzos", en: "Tuna & Chickpea Salad" }, tags: ["hígado graso", "sin cocinar"], time: "10 min", ingredients: ["atún", "garbanzos", "pepino", "tomate", "limón", "aceite de oliva", "perejil"], steps: { es: ["Escurre atún y garbanzos.", "Corta pepino y tomate en cubos.", "Mezcla todo.", "Aderezo: limón + aceite de oliva + sal + perejil."], en: ["Drain tuna and chickpeas.", "Dice cucumber and tomato.", "Mix everything.", "Dressing: lemon + olive oil + salt + parsley."] }, note: { es: "Para NAFLD: reducir carbohidratos refinados es intervención dietética #1. Este plato no tiene ninguno.", en: "For NAFLD: reducing refined carbs is dietary intervention #1. This dish has none." } },
];

const HIKES = [
  { name: "Rimrocks Trail", dist: "2.5 mi", diff: { es: "Accesible", en: "Accessible" }, note: { es: "Vistas del valle desde las formaciones de arenisca. Ideal al amanecer.", en: "Valley views from sandstone formations. Ideal at sunrise." } },
  { name: "Chief Black Otter Trail", dist: "1.5 mi", diff: { es: "Accesible", en: "Accessible" }, note: { es: "Histórico y silencioso. Las vistas panorámicas son honestas.", en: "Historic and quiet. The panoramic views are honest." } },
  { name: "Pictograph Cave", dist: "2 mi", diff: { es: "Moderado", en: "Moderate" }, note: { es: "Pinturas rupestres de 2,000 años. Algo que no se puede fingir ver.", en: "2,000-year-old rock paintings. Something you can't pretend to see." } },
  { name: "Beartooth Highway", dist: "varies", diff: { es: "Moderado-difícil", en: "Moderate-hard" }, note: { es: "Una de las rutas más honestas de EUA. 1.5 hrs de Billings. Reserva un día completo.", en: "One of the most honest drives in the US. 1.5 hrs from Billings. Reserve a full day." } },
  { name: "Lake Elmo State Park", dist: "3 mi loop", diff: { es: "Accesible", en: "Accessible" }, note: { es: "Lago, kayak, caminata. Dentro de Billings. Para cuando el mundo es demasiado.", en: "Lake, kayak, walk. Inside Billings. For when the world is too much." } },
];

const INVESTMENTS = [
  { id: "i1", item: { es: "Robot aspirador (básico)", en: "Basic robot vacuum" }, priority: "alta", est: "$200–300", note: { es: "Piso de madera + alfombra. Regresa de un shoot y la casa ya está limpia.", en: "Hardwood + carpet. Come back from a shoot and the house is already clean." } },
  { id: "i2", item: { es: "Mopa de microfibra para madera (Bona)", en: "Microfiber mop for hardwood (Bona)" }, priority: "alta", est: "$30–50", note: { es: "El mejor sistema para piso de madera. El trapero convencional lo daña con el tiempo.", en: "Best system for hardwood. A conventional mop damages it over time." } },
  { id: "i3", item: { es: "Difusor de aceites esenciales", en: "Essential oil diffuser" }, priority: "alta", est: "$30–50", note: { es: "La casa huele bien de manera consistente sin químicos.", en: "The home smells consistently good without chemicals." } },
  { id: "i4", item: { es: "Set de contenedores para meal prep", en: "Meal prep container set" }, priority: "media", est: "$25–40", note: { es: "Para cocinar en batch y sostener la dieta en semanas ocupadas.", en: "For batch cooking and sustaining the diet during busy weeks." } },
  { id: "i5", item: { es: "Luz UV/UVB para terrario de Birdie", en: "UV/UVB light for Birdie's terrarium" }, priority: "alta", est: "$40–80", note: { es: "Los bearded dragons requieren UVB. No es opcional — es salud.", en: "Bearded dragons require UVB. Not optional — it's health." } },
  { id: "i6", item: { es: "Aspiradora con filtro HEPA", en: "HEPA filter vacuum" }, priority: "media", est: "$150–250", note: { es: "Para alfombras y alérgenos. Diferencia visible en calidad del aire.", en: "For carpets and allergens. Visible difference in air quality." } },
  { id: "i7", item: { es: "Sistema de riego automático para plantas", en: "Automatic watering system for plants" }, priority: "baja", est: "$20–40", note: { es: "Para cuando viajes a México.", en: "For when you travel to Mexico." } },
];

// ─── STORAGE ──────────────────────────────────────────────────────────────────
const SK = "nido-v3";
function load() { try { return JSON.parse(localStorage.getItem(SK)) || {}; } catch { return {}; } }
function save(d) { try { localStorage.setItem(SK, JSON.stringify(d)); } catch {} }

// ─── UI PRIMITIVES ────────────────────────────────────────────────────────────
function Rule() { return <div style={{ height: 1, background: C.rule, margin: "16px 0" }} />; }

function Epigraph({ section }) {
  const e = EPIGRAPHS[section];
  if (!e) return null;
  return (
    <div style={{ borderLeft: `2px solid ${C.gold}`, paddingLeft: 16, marginBottom: 28, marginTop: 4 }}>
      <div style={{ fontFamily: FB, fontSize: 13, color: C.muted, lineHeight: 1.7, fontStyle: "italic" }}>"{e.quote}"</div>
      <div style={{ fontFamily: FM, fontSize: 10, color: C.gold, marginTop: 6, letterSpacing: "0.1em" }}>— {e.author.toUpperCase()}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  return <div style={{ fontFamily: FM, fontSize: 10, letterSpacing: "0.14em", color: C.muted, marginBottom: 12, marginTop: 4 }}>{children}</div>;
}

function Pill({ label, variant = "default" }) {
  const variants = {
    default: { bg: C.warm, color: C.muted },
    accent: { bg: C.accentSoft, color: C.accent },
    forest: { bg: C.forestSoft, color: C.forest },
    gold: { bg: C.goldSoft, color: C.gold },
  };
  const v = variants[variant] || variants.default;
  return (
    <span style={{ background: v.bg, color: v.color, fontSize: 10, fontWeight: 600, padding: "2px 9px", borderRadius: 20, fontFamily: FM, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
      {label}
    </span>
  );
}

function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.rule}`, borderRadius: 12, padding: 18, boxShadow: C.shadow, ...style }}>{children}</div>;
}

function GhostBtn({ children, onClick, active }) {
  return (
    <button onClick={onClick} style={{
      background: active ? C.ink : "transparent",
      color: active ? C.paper : C.muted,
      border: `1px solid ${active ? C.ink : C.rule}`,
      borderRadius: 6, padding: "6px 14px",
      fontSize: 12, fontWeight: 500, cursor: "pointer",
      fontFamily: FS, transition: "all 0.15s",
      letterSpacing: "0.02em",
    }}>{children}</button>
  );
}

function TextInput({ value, onChange, placeholder, onEnter, multiline }) {
  const style = {
    width: "100%", padding: "10px 14px",
    border: `1px solid ${C.rule}`, borderRadius: 8,
    background: C.paper, fontSize: 14, fontFamily: FS,
    color: C.ink, outline: "none", lineHeight: 1.5,
    boxSizing: "border-box", resize: multiline ? "vertical" : "none",
    minHeight: multiline ? 80 : "auto",
  };
  if (multiline) return <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={style} />;
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} onKeyDown={e => e.key === "Enter" && onEnter && onEnter()} style={style} />;
}

function PrimaryBtn({ children, onClick, disabled, variant = "dark" }) {
  const bg = variant === "dark" ? C.ink : variant === "forest" ? C.forest : C.accent;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: "100%", padding: "11px 16px",
      background: disabled ? C.rule : bg,
      color: disabled ? C.muted : "#fff",
      border: "none", borderRadius: 8,
      fontSize: 13, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
      fontFamily: FS, letterSpacing: "0.03em", transition: "background 0.15s",
    }}>{children}</button>
  );
}

function CheckRow({ done, onToggle, children }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <button onClick={onToggle} style={{
        width: 22, height: 22, borderRadius: "50%", flexShrink: 0, marginTop: 1,
        border: `1.5px solid ${done ? C.forest : C.rule}`,
        background: done ? C.forest : "transparent",
        cursor: "pointer", color: "#fff", fontSize: 11,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.15s",
      }}>{done ? "✓" : ""}</button>
      <div style={{ flex: 1, opacity: done ? 0.45 : 1 }}>{children}</div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "casa", label: { es: "Casa", en: "Home" } },
  { id: "laundry", label: { es: "Ropa", en: "Laundry" } },
  { id: "dishes", label: { es: "Trastes", en: "Dishes" } },
  { id: "cocina", label: { es: "Cocina", en: "Kitchen" } },
  { id: "birdie", label: { es: "Birdie", en: "Birdie" } },
  { id: "plantas", label: { es: "Plantas", en: "Plants" } },
  { id: "salir", label: { es: "Salir", en: "Outside" } },
  { id: "compras", label: { es: "Compras", en: "Shopping" } },
  { id: "inversiones", label: { es: "Invertir", en: "Invest" } },
];

export default function App() {
  const [lang, setLang] = useState("es");
  const [tab, setTab] = useState("casa");
  const [data, setData] = useState(load);

  function upd(key, val) {
    const next = { ...data, [key]: val };
    setData(next);
    save(next);
  }

  return (
    <div style={{ minHeight: "100vh", background: C.paper, fontFamily: FS, color: C.ink }}>
      {/* HEADER */}
      <div style={{ background: C.ink, borderBottom: `1px solid #222` }}>
        <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 16px" }}>
            <div style={{ fontFamily: FD, fontSize: 32, color: C.paper, letterSpacing: "-1px", fontWeight: 700 }}>Nido</div>
            <button onClick={() => setLang(l => l === "es" ? "en" : "es")} style={{
              background: "transparent", color: C.muted,
              border: `1px solid #333`, borderRadius: 6,
              padding: "5px 12px", fontSize: 11, fontWeight: 600,
              cursor: "pointer", fontFamily: FM, letterSpacing: "0.1em",
            }}>{lang === "es" ? "EN" : "ES"}</button>
          </div>
          {/* TABS */}
          <div style={{ display: "flex", gap: 0, overflowX: "auto", paddingBottom: 0 }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: "transparent",
                color: tab === t.id ? C.paper : "#555",
                border: "none",
                borderBottom: `2px solid ${tab === t.id ? C.accent : "transparent"}`,
                cursor: "pointer",
                padding: "10px 14px 12px", fontSize: 12, fontWeight: tab === t.id ? 600 : 400,
                whiteSpace: "nowrap", fontFamily: FS,
                transition: "all 0.15s", letterSpacing: "0.02em",
              }}>{t.label[lang]}</button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "28px 16px 80px" }}>
        {tab === "casa" && <CasaTab lang={lang} data={data} upd={upd} />}
        {tab === "laundry" && <LaundryTab lang={lang} data={data} upd={upd} />}
        {tab === "dishes" && <DishesTab lang={lang} data={data} upd={upd} />}
        {tab === "cocina" && <CocinaTab lang={lang} data={data} upd={upd} />}
        {tab === "birdie" && <BirdieTab lang={lang} data={data} upd={upd} />}
        {tab === "plantas" && <PlantasTab lang={lang} data={data} upd={upd} />}
        {tab === "salir" && <SalirTab lang={lang} data={data} upd={upd} />}
        {tab === "compras" && <ComprasTab lang={lang} data={data} upd={upd} />}
        {tab === "inversiones" && <InversionesTab lang={lang} data={data} upd={upd} />}
      </div>
    </div>
  );
}

// ─── CASA TAB ─────────────────────────────────────────────────────────────────
function CasaTab({ lang, data, upd }) {
  const [zone, setZone] = useState("sala");
  const [view, setView] = useState("tasks");
  const [aiQ, setAiQ] = useState(""); const [aiA, setAiA] = useState(""); const [aiLoading, setAiLoading] = useState(false);
  const done = data.cleanDone || {};
  const z = ZONES.find(z => z.id === zone);

  function toggle(id) {
    const next = { ...done };
    if (next[id]) delete next[id]; else next[id] = new Date().toISOString();
    upd("cleanDone", next);
  }

  async function askAgent() {
    if (!aiQ.trim()) return;
    setAiLoading(true); setAiA("");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are a senior household management expert with the rigor of a White House housekeeping chief. Respond in ${lang === "es" ? "Spanish" : "English"}. The user lives in Billings, Montana. Hardwood floors in living room and kitchen, carpet elsewhere. She has a bearded dragon named Birdie — no bleach or fragrances near her. Favorite cleaning agents: white vinegar, baking soda, Castile soap. Be specific, clinical, and direct. No filler.`,
          messages: [{ role: "user", content: aiQ }],
        }),
      });
      const d = await r.json();
      setAiA(d.content?.[0]?.text || "—");
    } catch { setAiA(lang === "es" ? "Error. Intenta de nuevo." : "Error. Try again."); }
    setAiLoading(false);
  }

  const floorLabel = { wood: lang === "es" ? "Madera" : "Hardwood", carpet: lang === "es" ? "Alfombra" : "Carpet", tile: lang === "es" ? "Azulejo" : "Tile", outdoor: lang === "es" ? "Exterior" : "Exterior", mixed: lang === "es" ? "Mixto" : "Mixed" };

  return (
    <>
      <Epigraph section="casa" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        <GhostBtn active={view === "tasks"} onClick={() => setView("tasks")}>{lang === "es" ? "Protocolos" : "Protocols"}</GhostBtn>
        <GhostBtn active={view === "agent"} onClick={() => setView("agent")}>{lang === "es" ? "Consultar agente" : "Ask agent"}</GhostBtn>
      </div>

      {view === "tasks" && (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {ZONES.map(z => (
              <GhostBtn key={z.id} active={zone === z.id} onClick={() => setZone(z.id)}>{z.label[lang]}</GhostBtn>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            <Pill label={floorLabel[z.floor]} variant="default" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
            {z.tasks.map(task => {
              const isDone = !!done[task.id];
              const days = done[task.id] ? Math.floor((Date.now() - new Date(done[task.id])) / 86400000) : null;
              return (
                <Card key={task.id} style={{ opacity: isDone ? 0.6 : 1, transition: "opacity 0.2s" }}>
                  <CheckRow done={isDone} onToggle={() => toggle(task.id)}>
                    <div style={{ fontSize: 14, fontWeight: isDone ? 400 : 500, textDecoration: isDone ? "line-through" : "none", color: isDone ? C.muted : C.ink, marginBottom: 4 }}>
                      {task[lang]}
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 6 }}>
                      <Pill label={task.freq} variant="default" />
                      {isDone && days !== null && <Pill label={days === 0 ? (lang === "es" ? "hoy" : "today") : `${days}d`} variant="forest" />}
                    </div>
                    <div style={{ fontSize: 12, color: C.accent, lineHeight: 1.5, fontFamily: FB, fontStyle: "italic" }}>
                      {task.product[lang]}
                    </div>
                  </CheckRow>
                </Card>
              );
            })}
          </div>
          <Rule />
          <div style={{ marginBottom: 16 }}>
            <SectionLabel>{lang === "es" ? "CONSEJO DE LA ABUELA" : "GRANDMOTHER'S METHOD"}</SectionLabel>
            <Card style={{ borderLeft: `3px solid ${C.accent}` }}>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7, fontFamily: FB }}>{z.abuela[lang]}</div>
            </Card>
          </div>
          <div>
            <SectionLabel>{lang === "es" ? "PARA QUE HUELA BIEN" : "ON SCENT"}</SectionLabel>
            <Card style={{ borderLeft: `3px solid ${C.forest}` }}>
              <div style={{ fontSize: 13, color: C.mid, lineHeight: 1.7, fontFamily: FB }}>{z.smell[lang]}</div>
            </Card>
          </div>
        </>
      )}

      {view === "agent" && (
        <Card>
          <SectionLabel>{lang === "es" ? "AGENTE DE LIMPIEZA" : "CLEANING AGENT"}</SectionLabel>
          <div style={{ fontFamily: FD, fontSize: 20, marginBottom: 8 }}>
            {lang === "es" ? "Consulta directa" : "Direct consultation"}
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
            {lang === "es" ? "Manchas, materiales, frecuencias, productos — pregunta lo que sea con precisión." : "Stains, materials, frequencies, products — ask anything with precision."}
          </div>
          <TextInput value={aiQ} onChange={setAiQ} multiline
            placeholder={lang === "es" ? "Ej: ¿Cómo elimino manchas de moho en la junta de silicón de la regadera?" : "E.g. How do I remove mold from shower silicone grout?"}
          />
          <div style={{ marginTop: 10 }}>
            <PrimaryBtn onClick={askAgent} disabled={aiLoading || !aiQ.trim()}>
              {aiLoading ? (lang === "es" ? "Procesando..." : "Processing...") : (lang === "es" ? "Consultar" : "Ask")}
            </PrimaryBtn>
          </div>
          {aiA && (
            <div style={{ marginTop: 20, borderTop: `1px solid ${C.rule}`, paddingTop: 16 }}>
              <div style={{ fontSize: 14, color: C.ink, lineHeight: 1.8, fontFamily: FB, whiteSpace: "pre-wrap" }}>{aiA}</div>
            </div>
          )}
        </Card>
      )}
    </>
  );
}

// ─── LAUNDRY TAB ──────────────────────────────────────────────────────────────
function LaundryTab({ lang, data, upd }) {
  const done = data.laundryDone || {};
  const log = data.laundryLog || [];
  const [logInput, setLogInput] = useState("");
  const [view, setView] = useState("tasks");

  function toggle(id) {
    const next = { ...done };
    if (next[id]) delete next[id]; else next[id] = new Date().toISOString();
    upd("laundryDone", next);
  }

  function addLog() {
    if (!logInput.trim()) return;
    upd("laundryLog", [{ id: Date.now(), text: logInput.trim(), date: new Date().toISOString() }, ...log].slice(0, 40));
    setLogInput("");
  }

  return (
    <>
      <Epigraph section="laundry" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <GhostBtn active={view === "tasks"} onClick={() => setView("tasks")}>{lang === "es" ? "Protocolos" : "Protocols"}</GhostBtn>
        <GhostBtn active={view === "log"} onClick={() => setView("log")}>Log</GhostBtn>
      </div>

      {view === "tasks" && (
        <>
          <SectionLabel>{lang === "es" ? "SISTEMA DE LAVADO" : "WASHING SYSTEM"}</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
            {LAUNDRY_TASKS.map(task => {
              const isDone = !!done[task.id];
              const days = done[task.id] ? Math.floor((Date.now() - new Date(done[task.id])) / 86400000) : null;
              return (
                <Card key={task.id} style={{ opacity: isDone ? 0.6 : 1 }}>
                  <CheckRow done={isDone} onToggle={() => toggle(task.id)}>
                    <div style={{ fontSize: 14, fontWeight: 500, textDecoration: isDone ? "line-through" : "none", color: isDone ? C.muted : C.ink, marginBottom: 4 }}>
                      {task[lang]}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginBottom: 6 }}>
                      <Pill label={task.freq} />
                      {isDone && days !== null && <Pill label={days === 0 ? (lang === "es" ? "hoy" : "today") : `${days}d`} variant="forest" />}
                    </div>
                    <div style={{ fontSize: 12, color: C.accent, lineHeight: 1.5, fontFamily: FB, fontStyle: "italic" }}>{task.product[lang]}</div>
                  </CheckRow>
                </Card>
              );
            })}
          </div>
          <Rule />
          <SectionLabel>{lang === "es" ? "REGLA CARDINAL" : "CARDINAL RULE"}</SectionLabel>
          <Card style={{ borderLeft: `3px solid ${C.accent}` }}>
            <div style={{ fontSize: 13, fontFamily: FB, color: C.ink, lineHeight: 1.7, fontStyle: "italic" }}>
              {lang === "es"
                ? "La ropa no está lista hasta que está guardada. Doblada en la canasta no es terminar — es posponer."
                : "Laundry is not done until it is put away. Folded in a basket is not finishing — it is postponing."}
            </div>
          </Card>
        </>
      )}

      {view === "log" && (
        <>
          <SectionLabel>{lang === "es" ? "REGISTRO DE LAVADO" : "LAUNDRY LOG"}</SectionLabel>
          <Card style={{ marginBottom: 20 }}>
            <TextInput value={logInput} onChange={setLogInput}
              placeholder={lang === "es" ? "¿Qué lavaste hoy? Ej: sábanas blancas, ropa de color..." : "What did you wash today? E.g. white sheets, colored clothes..."}
              onEnter={addLog}
            />
            <div style={{ marginTop: 10 }}>
              <PrimaryBtn onClick={addLog} disabled={!logInput.trim()}>{lang === "es" ? "Registrar" : "Log"}</PrimaryBtn>
            </div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {log.map(e => (
              <Card key={e.id} style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 14, color: C.ink }}>{e.text}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: FM }}>{new Date(e.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
            {!log.length && <div style={{ color: C.muted, fontSize: 13, textAlign: "center", marginTop: 20 }}>{lang === "es" ? "Sin registros." : "No entries."}</div>}
          </div>
        </>
      )}
    </>
  );
}

// ─── DISHES TAB ───────────────────────────────────────────────────────────────
function DishesTab({ lang, data, upd }) {
  const done = data.dishesDone || {};
  const log = data.dishesLog || [];
  const [logInput, setLogInput] = useState("");
  const [view, setView] = useState("tasks");

  function toggle(id) {
    const next = { ...done };
    if (next[id]) delete next[id]; else next[id] = new Date().toISOString();
    upd("dishesDone", next);
  }

  function addLog() {
    if (!logInput.trim()) return;
    upd("dishesLog", [{ id: Date.now(), text: logInput.trim(), date: new Date().toISOString() }, ...log].slice(0, 30));
    setLogInput("");
  }

  return (
    <>
      <Epigraph section="cocina" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <GhostBtn active={view === "tasks"} onClick={() => setView("tasks")}>{lang === "es" ? "Protocolos" : "Protocols"}</GhostBtn>
        <GhostBtn active={view === "log"} onClick={() => setView("log")}>Log</GhostBtn>
      </div>
      {view === "tasks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DISHES_TASKS.map(task => {
            const isDone = !!done[task.id];
            return (
              <Card key={task.id} style={{ opacity: isDone ? 0.6 : 1 }}>
                <CheckRow done={isDone} onToggle={() => toggle(task.id)}>
                  <div style={{ fontSize: 14, fontWeight: 500, textDecoration: isDone ? "line-through" : "none", color: isDone ? C.muted : C.ink, marginBottom: 6 }}>
                    {task[lang]}
                  </div>
                  {task.freq && <Pill label={task.freq} />}
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 8, lineHeight: 1.6, fontFamily: FB, fontStyle: "italic" }}>{task.tip[lang]}</div>
                </CheckRow>
              </Card>
            );
          })}
        </div>
      )}
      {view === "log" && (
        <>
          <Card style={{ marginBottom: 20 }}>
            <TextInput value={logInput} onChange={setLogInput} placeholder={lang === "es" ? "¿Qué limpiaste hoy en la cocina?" : "What did you clean in the kitchen today?"} onEnter={addLog} />
            <div style={{ marginTop: 10 }}><PrimaryBtn onClick={addLog} disabled={!logInput.trim()}>{lang === "es" ? "Registrar" : "Log"}</PrimaryBtn></div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {log.map(e => (
              <Card key={e.id} style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14 }}>{e.text}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: FM }}>{new Date(e.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─── COCINA TAB ───────────────────────────────────────────────────────────────
function CocinaTab({ lang, data, upd }) {
  const [view, setView] = useState("recetas");
  const [sel, setSel] = useState(null);
  const [ing, setIng] = useState(""); const [sug, setSug] = useState(""); const [loading, setLoading] = useState(false);
  const log = data.mealLog || [];
  const [logInput, setLogInput] = useState("");

  async function suggest() {
    if (!ing.trim()) return;
    setLoading(true); setSug("");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are a PhD clinical nutritionist with expertise in NAFLD (non-alcoholic fatty liver disease) and weight management. Respond in ${lang === "es" ? "Spanish" : "English"}. The female user weighs 165 lbs and wants to be more fit. Her husband weighs 185 lbs and has fatty liver disease. Suggest 2-3 specific, realistic recipes based on available ingredients. For each recipe: name, brief steps, and a clinical note on why it serves their specific health conditions. Be direct, evidence-based, and practical.`,
          messages: [{ role: "user", content: `Available ingredients: ${ing}` }],
        }),
      });
      const d = await r.json();
      setSug(d.content?.[0]?.text || "—");
    } catch { setSug(lang === "es" ? "Error." : "Error."); }
    setLoading(false);
  }

  function addLog() {
    if (!logInput.trim()) return;
    upd("mealLog", [{ id: Date.now(), text: logInput.trim(), date: new Date().toISOString() }, ...log].slice(0, 40));
    setLogInput("");
  }

  return (
    <>
      <Epigraph section="cocina" />
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { id: "recetas", label: lang === "es" ? "Recetas" : "Recipes" },
          { id: "qcook", label: lang === "es" ? "¿Qué cocino?" : "What to cook?" },
          { id: "log", label: "Meal log" },
        ].map(v => <GhostBtn key={v.id} active={view === v.id} onClick={() => setView(v.id)}>{v.label}</GhostBtn>)}
      </div>

      {view === "recetas" && !sel && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {RECIPES.map(r => (
            <Card key={r.id} style={{ cursor: "pointer" }} onClick={() => setSel(r)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div style={{ fontFamily: FD, fontSize: 17 }}>{r.name[lang]}</div>
                <span style={{ fontSize: 11, color: C.muted, fontFamily: FM }}>{r.time}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 8 }}>
                {r.tags.map(t => <Pill key={t} label={t} variant="gold" />)}
              </div>
              <div style={{ fontSize: 12, color: C.forest, fontFamily: FB, fontStyle: "italic", lineHeight: 1.5 }}>{r.note[lang]}</div>
            </Card>
          ))}
        </div>
      )}

      {view === "recetas" && sel && (
        <>
          <button onClick={() => setSel(null)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 12, fontFamily: FM, letterSpacing: "0.08em", marginBottom: 20, padding: 0 }}>
            ← {lang === "es" ? "VOLVER" : "BACK"}
          </button>
          <Card>
            <div style={{ fontFamily: FD, fontSize: 24, marginBottom: 4 }}>{sel.name[lang]}</div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: FM, marginBottom: 16 }}>{sel.time} · {lang === "es" ? "2 porciones" : "2 servings"}</div>
            <SectionLabel>{lang === "es" ? "INGREDIENTES" : "INGREDIENTS"}</SectionLabel>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {sel.ingredients.map(i => <Pill key={i} label={i} variant="accent" />)}
            </div>
            <SectionLabel>{lang === "es" ? "PREPARACIÓN" : "PREPARATION"}</SectionLabel>
            {sel.steps[lang].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                <span style={{ fontFamily: FM, fontSize: 11, color: C.accent, minWidth: 16, paddingTop: 2 }}>{i + 1}</span>
                <span style={{ fontSize: 14, color: C.ink, lineHeight: 1.6 }}>{s}</span>
              </div>
            ))}
            <Rule />
            <SectionLabel>NUTRITIONIST NOTE</SectionLabel>
            <div style={{ fontSize: 13, color: C.forest, fontFamily: FB, fontStyle: "italic", lineHeight: 1.7 }}>{sel.note[lang]}</div>
          </Card>
        </>
      )}

      {view === "qcook" && (
        <Card>
          <div style={{ fontFamily: FD, fontSize: 20, marginBottom: 6 }}>
            {lang === "es" ? "¿Qué tengo en el refri?" : "What's in the fridge?"}
          </div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
            {lang === "es" ? "Lista los ingredientes disponibles. Las sugerencias toman en cuenta hígado graso y objetivos de fitness." : "List available ingredients. Suggestions account for fatty liver and fitness goals."}
          </div>
          <TextInput value={ing} onChange={setIng} multiline
            placeholder={lang === "es" ? "pollo, arroz integral, espinaca, ajo, limón..." : "chicken, brown rice, spinach, garlic, lemon..."}
          />
          <div style={{ marginTop: 10 }}>
            <PrimaryBtn onClick={suggest} disabled={loading || !ing.trim()} variant="forest">
              {loading ? (lang === "es" ? "Procesando..." : "Processing...") : (lang === "es" ? "Sugerir recetas" : "Suggest recipes")}
            </PrimaryBtn>
          </div>
          {sug && <div style={{ marginTop: 20, borderTop: `1px solid ${C.rule}`, paddingTop: 16, fontSize: 14, color: C.ink, lineHeight: 1.8, fontFamily: FB, whiteSpace: "pre-wrap" }}>{sug}</div>}
        </Card>
      )}

      {view === "log" && (
        <>
          <Card style={{ marginBottom: 20 }}>
            <TextInput value={logInput} onChange={setLogInput} placeholder={lang === "es" ? "¿Qué comiste hoy?" : "What did you eat today?"} onEnter={addLog} />
            <div style={{ marginTop: 10 }}><PrimaryBtn onClick={addLog} disabled={!logInput.trim()}>{lang === "es" ? "Registrar" : "Log"}</PrimaryBtn></div>
          </Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {log.map(e => (
              <Card key={e.id} style={{ padding: "12px 16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14 }}>{e.text}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: FM }}>{new Date(e.date).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─── BIRDIE TAB ───────────────────────────────────────────────────────────────
function BirdieTab({ lang, data, upd }) {
  const log = data.birdieLog || [];
  const [food, setFood] = useState(""); const [note, setNote] = useState("");
  const lastFed = log[0]?.date;
  const daysSince = lastFed ? Math.floor((Date.now() - new Date(lastFed)) / 86400000) : null;

  function addFeeding() {
    if (!food.trim()) return;
    upd("birdieLog", [{ id: Date.now(), food: food.trim(), note: note.trim(), date: new Date().toISOString() }, ...log].slice(0, 60));
    setFood(""); setNote("");
  }

  const quickFoods = lang === "es"
    ? ["Dubia roaches", "Col rizada", "Diente de león", "Pimiento rojo", "Calabaza", "Arándanos"]
    : ["Dubia roaches", "Collard greens", "Dandelion greens", "Red bell pepper", "Butternut squash", "Blueberries"];

  return (
    <>
      <Epigraph section="birdie" />
      <Card style={{ background: C.ink, border: "none", color: C.paper, marginBottom: 24 }}>
        <div style={{ fontFamily: FD, fontSize: 22, marginBottom: 4 }}>Birdie</div>
        <div style={{ fontSize: 11, color: "#666", fontFamily: FM, letterSpacing: "0.1em", marginBottom: 12 }}>BEARDED DRAGON</div>
        {daysSince !== null
          ? <div style={{ fontSize: 13, color: "#aaa" }}>{lang === "es" ? "Última alimentación:" : "Last feeding:"} {daysSince === 0 ? (lang === "es" ? "hoy" : "today") : `${daysSince}d ago`}</div>
          : <div style={{ fontSize: 13, color: "#555" }}>{lang === "es" ? "Sin registro de alimentación." : "No feeding logged yet."}</div>
        }
      </Card>

      <SectionLabel>{lang === "es" ? "ALIMENTACIÓN RÁPIDA" : "QUICK LOG"}</SectionLabel>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        {quickFoods.map(f => <GhostBtn key={f} active={food === f} onClick={() => setFood(f)}>{f}</GhostBtn>)}
      </div>
      <Card style={{ marginBottom: 24 }}>
        <TextInput value={food} onChange={setFood} placeholder={lang === "es" ? "¿Qué comió Birdie?" : "What did Birdie eat?"} onEnter={addFeeding} />
        <div style={{ marginTop: 8 }}>
          <TextInput value={note} onChange={setNote} placeholder={lang === "es" ? "Notas (comportamiento, cantidad, etc.)" : "Notes (behavior, amount, etc.)"} />
        </div>
        <div style={{ marginTop: 10 }}>
          <PrimaryBtn onClick={addFeeding} disabled={!food.trim()} variant="forest">
            {lang === "es" ? "Registrar" : "Log feeding"}
          </PrimaryBtn>
        </div>
      </Card>

      <SectionLabel>{lang === "es" ? "CUIDADOS ESENCIALES" : "ESSENTIAL CARE"}</SectionLabel>
      <Card style={{ marginBottom: 24 }}>
        {[
          { es: "Dubia roaches son proteína primaria. 3-5 por día para adulto.", en: "Dubia roaches are primary protein. 3-5 daily for an adult." },
          { es: "Verduras frescas diario. Col, diente de león, pimiento — base de la dieta vegetal.", en: "Fresh greens daily. Collard greens, dandelion, bell pepper — plant diet base." },
          { es: "UVB 10-12 hrs diario. Sin UVB no hay metabolismo de calcio. No es opcional.", en: "UVB 10-12 hrs daily. Without UVB there is no calcium metabolism. Not optional." },
          { es: "Basking spot: 100-110°F. Cool side: 80-85°F. La temperatura regula su digestión.", en: "Basking spot: 100-110°F. Cool side: 80-85°F. Temperature regulates her digestion." },
          { es: "Limpiar con vinagre blanco diluido 1:1. Nunca cloro, nunca fragancias.", en: "Clean with diluted white vinegar 1:1. Never bleach, never fragrances." },
          { es: "Baño tibio 1x/semana — hidratación y muda de piel.", en: "Warm bath 1x/week — hydration and shedding support." },
        ].map((tip, i) => (
          <div key={i} style={{ fontSize: 13, color: C.ink, lineHeight: 1.6, paddingBottom: 8, borderBottom: i < 5 ? `1px solid ${C.rule}` : "none", marginBottom: 8 }}>
            {tip[lang]}
          </div>
        ))}
      </Card>

      {log.length > 0 && (
        <>
          <SectionLabel>LOG</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {log.slice(0, 10).map(e => (
              <Card key={e.id} style={{ padding: "10px 14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 14, fontWeight: 500 }}>{e.food}</span>
                  <span style={{ fontSize: 11, color: C.muted, fontFamily: FM }}>{new Date(e.date).toLocaleDateString()}</span>
                </div>
                {e.note && <div style={{ fontSize: 12, color: C.muted, marginTop: 4, fontStyle: "italic" }}>{e.note}</div>}
              </Card>
            ))}
          </div>
        </>
      )}
    </>
  );
}

// ─── PLANTAS TAB ──────────────────────────────────────────────────────────────
function PlantasTab({ lang, data, upd }) {
  const defaultPlants = [
    { id: "p1", name: "Aloe Vera", emoji: "🌵", care: { es: "Regar cada 2-3 semanas. Deja secar completamente entre riegos. Luz indirecta brillante.", en: "Water every 2-3 weeks. Let dry completely between waterings. Bright indirect light." } },
    { id: "p2", name: "Snake Plant", emoji: "🌿", care: { es: "Regar cada 2-4 semanas. Tolera poca luz. La planta más resistente que existe.", en: "Water every 2-4 weeks. Tolerates low light. The most resilient plant that exists." } },
    { id: "p3", name: lang === "es" ? "Planta sin identificar" : "Unidentified plant", emoji: "🌱", care: { es: "Fotografía las hojas y búscala en PlantNet app — gratis.", en: "Photograph the leaves and search PlantNet app — free." } },
  ];
  const plants = data.plants || defaultPlants;
  const lawn = data.lawn || { lastCut: new Date(Date.now() - 7 * 86400000).toISOString() };
  const [name, setName] = useState(""); const [care, setCare] = useState("");

  function water(id) { upd("plants", plants.map(p => p.id === id ? { ...p, lastWatered: new Date().toISOString() } : p)); }
  function cutLawn() { upd("lawn", { lastCut: new Date().toISOString() }); }
  function addPlant() {
    if (!name.trim()) return;
    upd("plants", [...plants, { id: Date.now().toString(), name: name.trim(), emoji: "🌱", care: { es: care, en: care }, added: new Date().toISOString() }]);
    setName(""); setCare("");
  }

  const lawnDays = Math.floor((Date.now() - new Date(lawn.lastCut)) / 86400000);

  return (
    <>
      <Epigraph section="plantas" />
      <Card style={{ marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <SectionLabel>{lang === "es" ? "PASTO" : "LAWN"}</SectionLabel>
          <div style={{ fontFamily: FD, fontSize: 20 }}>
            {lawnDays === 0 ? (lang === "es" ? "Cortado hoy" : "Cut today") : `${lawnDays} ${lang === "es" ? "días" : "days"}`}
          </div>
          {lawnDays >= 10 && <div style={{ fontSize: 12, color: C.accent, marginTop: 4 }}>{lang === "es" ? "Considerar corte pronto" : "Consider mowing soon"}</div>}
        </div>
        <button onClick={cutLawn} style={{
          background: C.forest, color: "#fff", border: "none", borderRadius: 8,
          padding: "10px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer",
          fontFamily: FS, letterSpacing: "0.03em",
        }}>{lang === "es" ? "Corté hoy" : "Cut today"}</button>
      </Card>

      <SectionLabel>{lang === "es" ? "PLANTAS" : "PLANTS"}</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {plants.map(p => {
          const days = p.lastWatered ? Math.floor((Date.now() - new Date(p.lastWatered)) / 86400000) : null;
          return (
            <Card key={p.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FD, fontSize: 17, marginBottom: 4 }}>{p.emoji} {p.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.5, marginBottom: 8 }}>{p.care[lang] || p.care.es}</div>
                  {days !== null
                    ? <Pill label={days === 0 ? (lang === "es" ? "Regada hoy" : "Watered today") : `${lang === "es" ? "Regada" : "Watered"} ${days}d ago`} variant={days > 14 ? "accent" : "forest"} />
                    : <Pill label={lang === "es" ? "Sin registro" : "Not logged"} />
                  }
                </div>
                <button onClick={() => water(p.id)} style={{
                  background: C.forestSoft, color: C.forest, border: `1px solid ${C.forest}30`,
                  borderRadius: 8, padding: "8px 14px", fontSize: 12, fontWeight: 600,
                  cursor: "pointer", fontFamily: FS, flexShrink: 0, marginLeft: 12,
                }}>{lang === "es" ? "Regué" : "Watered"}</button>
              </div>
            </Card>
          );
        })}
      </div>

      <SectionLabel>{lang === "es" ? "AGREGAR PLANTA" : "ADD PLANT"}</SectionLabel>
      <Card>
        <TextInput value={name} onChange={setName} placeholder={lang === "es" ? "Nombre de la planta" : "Plant name"} />
        <div style={{ marginTop: 8 }}>
          <TextInput value={care} onChange={setCare} placeholder={lang === "es" ? "Instrucciones de cuidado" : "Care instructions"} />
        </div>
        <div style={{ marginTop: 10 }}>
          <PrimaryBtn onClick={addPlant} disabled={!name.trim()}>{lang === "es" ? "Agregar" : "Add"}</PrimaryBtn>
        </div>
      </Card>
    </>
  );
}

// ─── SALIR TAB ────────────────────────────────────────────────────────────────
function SalirTab({ lang, data, upd }) {
  const [mood, setMood] = useState(""); const [plan, setPlan] = useState(""); const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true); setPlan("");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: `You are a meticulous Montana outdoor guide. Respond in ${lang === "es" ? "Spanish" : "English"}. The user lives in Billings, MT. Generate a specific, realistic outing plan. Include: exact destination, drive time from Billings, what to bring, why this particular place. Be direct. No filler. Treat the outdoors with the seriousness it deserves.`,
          messages: [{ role: "user", content: `Generate a weekend outing plan. ${mood ? `How I feel: ${mood}.` : ""} Two people.` }],
        }),
      });
      const d = await r.json();
      setPlan(d.content?.[0]?.text || "—");
    } catch { setPlan("Error."); }
    setLoading(false);
  }

  return (
    <>
      <Epigraph section="salir" />
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontFamily: FD, fontSize: 20, marginBottom: 6 }}>
          {lang === "es" ? "Generar plan" : "Generate plan"}
        </div>
        <div style={{ fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 1.6 }}>
          {lang === "es" ? "Billings y Montana tienen más de lo que parece. Un plan generado para dos." : "Billings and Montana have more than it seems. A generated plan for two."}
        </div>
        <TextInput value={mood} onChange={setMood} placeholder={lang === "es" ? "¿Cómo te sientes hoy? (opcional)" : "How do you feel today? (optional)"} />
        <div style={{ marginTop: 10 }}>
          <PrimaryBtn onClick={generate} disabled={loading}>
            {loading ? (lang === "es" ? "Generando..." : "Generating...") : (lang === "es" ? "Generar plan" : "Generate plan")}
          </PrimaryBtn>
        </div>
        {plan && <div style={{ marginTop: 20, borderTop: `1px solid ${C.rule}`, paddingTop: 16, fontSize: 14, color: C.ink, lineHeight: 1.8, fontFamily: FB, whiteSpace: "pre-wrap" }}>{plan}</div>}
      </Card>

      <SectionLabel>{lang === "es" ? "LUGARES CONOCIDOS" : "KNOWN PLACES"}</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {HIKES.map((h, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ fontFamily: FD, fontSize: 16 }}>{h.name}</div>
              <Pill label={h.diff[lang]} variant="default" />
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 11, color: C.muted, fontFamily: FM, marginBottom: 8 }}>
              <span>{h.dist}</span>
            </div>
            <div style={{ fontSize: 13, color: C.muted, fontFamily: FB, fontStyle: "italic", lineHeight: 1.5 }}>{h.note[lang]}</div>
          </Card>
        ))}
      </div>
    </>
  );
}

// ─── COMPRAS TAB ──────────────────────────────────────────────────────────────
function ComprasTab({ lang, data, upd }) {
  const items = data.shopping || [];
  const [input, setInput] = useState(""); const [cat, setCat] = useState("casa");
  const cats = { casa: lang === "es" ? "Casa" : "Home", comida: lang === "es" ? "Comida" : "Food", birdie: "Birdie", plantas: lang === "es" ? "Plantas" : "Plants", personal: "Personal" };

  function add() {
    if (!input.trim()) return;
    upd("shopping", [...items, { id: Date.now(), text: input.trim(), cat, done: false }]);
    setInput("");
  }

  function toggle(id) { upd("shopping", items.map(i => i.id === id ? { ...i, done: !i.done } : i)); }
  function remove(id) { upd("shopping", items.filter(i => i.id !== id)); }

  return (
    <>
      <Epigraph section="compras" />
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {Object.entries(cats).map(([k, v]) => <GhostBtn key={k} active={cat === k} onClick={() => setCat(k)}>{v}</GhostBtn>)}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <TextInput value={input} onChange={setInput} placeholder={lang === "es" ? "¿Qué necesitas?" : "What do you need?"} onEnter={add} />
          <button onClick={add} style={{ background: C.ink, color: C.paper, border: "none", borderRadius: 8, padding: "10px 18px", fontSize: 16, cursor: "pointer", flexShrink: 0 }}>+</button>
        </div>
      </Card>
      {Object.entries(cats).map(([k, v]) => {
        const list = items.filter(i => i.cat === k);
        if (!list.length) return null;
        return (
          <div key={k} style={{ marginBottom: 20 }}>
            <SectionLabel>{v.toUpperCase()}</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {list.map(item => (
                <Card key={item.id} style={{ padding: "10px 14px", opacity: item.done ? 0.45 : 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <CheckRow done={item.done} onToggle={() => toggle(item.id)}>
                      <span style={{ fontSize: 14, textDecoration: item.done ? "line-through" : "none" }}>{item.text}</span>
                    </CheckRow>
                    <button onClick={() => remove(item.id)} style={{ background: "none", border: "none", color: C.rule, cursor: "pointer", fontSize: 18, flexShrink: 0 }}>×</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
      {!items.length && <div style={{ textAlign: "center", color: C.muted, fontSize: 13, marginTop: 40, fontFamily: FB, fontStyle: "italic" }}>{lang === "es" ? "La lista está vacía." : "The list is empty."}</div>}
    </>
  );
}

// ─── INVERSIONES TAB ──────────────────────────────────────────────────────────
function InversionesTab({ lang, data, upd }) {
  const [name, setName] = useState(""); const [est, setEst] = useState(""); const [pri, setPri] = useState("media");
  const custom = data.customInv || [];
  const all = [...INVESTMENTS, ...custom];
  const bought = data.invBought || {};

  function toggleBought(id) {
    const next = { ...bought };
    if (next[id]) delete next[id]; else next[id] = new Date().toISOString();
    upd("invBought", next);
  }

  function addItem() {
    if (!name.trim()) return;
    upd("customInv", [...custom, { id: Date.now().toString(), item: { es: name, en: name }, priority: pri, est: est || "—", note: { es: "", en: "" } }]);
    setName(""); setEst("");
  }

  const priLabel = { alta: lang === "es" ? "Alta" : "High", media: lang === "es" ? "Media" : "Medium", baja: lang === "es" ? "Baja" : "Low" };
  const priVariant = { alta: "accent", media: "forest", baja: "default" };

  return (
    <>
      <Epigraph section="inversiones" />
      {["alta", "media", "baja"].map(p => {
        const list = all.filter(i => i.priority === p);
        if (!list.length) return null;
        return (
          <div key={p} style={{ marginBottom: 24 }}>
            <SectionLabel>{lang === "es" ? "PRIORIDAD" : "PRIORITY"} {priLabel[p].toUpperCase()}</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {list.map(item => (
                <Card key={item.id} style={{ opacity: bought[item.id] ? 0.45 : 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 500, textDecoration: bought[item.id] ? "line-through" : "none", marginBottom: 6 }}>{item.item[lang]}</div>
                      {item.note[lang] && <div style={{ fontSize: 12, color: C.muted, fontStyle: "italic", marginBottom: 8, lineHeight: 1.5 }}>{item.note[lang]}</div>}
                      <div style={{ display: "flex", gap: 8 }}>
                        <Pill label={item.est} variant={priVariant[p]} />
                        {bought[item.id] && <Pill label={lang === "es" ? "Adquirido" : "Acquired"} variant="forest" />}
                      </div>
                    </div>
                    <button onClick={() => toggleBought(item.id)} style={{
                      background: bought[item.id] ? C.warm : C.ink, color: bought[item.id] ? C.muted : C.paper,
                      border: "none", borderRadius: 8, padding: "8px 14px",
                      fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FS, flexShrink: 0,
                    }}>{bought[item.id] ? (lang === "es" ? "Deshacer" : "Undo") : (lang === "es" ? "Adquirí" : "Got it")}</button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
      <Rule />
      <SectionLabel>{lang === "es" ? "AGREGAR INVERSIÓN" : "ADD INVESTMENT"}</SectionLabel>
      <Card>
        <TextInput value={name} onChange={setName} placeholder={lang === "es" ? "¿Qué quieres adquirir?" : "What do you want to acquire?"} />
        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
          <TextInput value={est} onChange={setEst} placeholder={lang === "es" ? "Costo estimado" : "Estimated cost"} />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          {["alta", "media", "baja"].map(p => <GhostBtn key={p} active={pri === p} onClick={() => setPri(p)}>{priLabel[p]}</GhostBtn>)}
        </div>
        <div style={{ marginTop: 12 }}><PrimaryBtn onClick={addItem} disabled={!name.trim()}>{lang === "es" ? "Agregar" : "Add"}</PrimaryBtn></div>
      </Card>
    </>
  );
}