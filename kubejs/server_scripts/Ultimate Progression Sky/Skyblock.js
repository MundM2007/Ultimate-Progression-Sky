onEvent('recipes', event => {  
  function hammer(input, output) {
    event.custom({
      type: "exnihilosequentia:hammer",
      input: Ingredient.of(input).toJson(),
      results: [Item.of(output).toResultJson()]
    })
  }

  function chammer(input, output, count) {
    event.custom({
      type: "excompressum:compressed_hammer",
      input: Ingredient.of(input).toJson(),
      lootTable: {
        type: "minecraft:block",
        pools: [{
          rolls: 1,
          entries: [{
            type: "minecraft:item",
            name: output,
            functions: [{
              function: "minecraft:set_count",
              count: count
            }]
          }],
          conditions: []
        }]
      }
    })
  }

  function sieve(input, output, firstMesh, firstChance, secondMesh, secondChance, thirdMesh, thirdChance, water) {
    if (!(secondChance == null || secondMesh == null)){
        second = {chance: secondChance, mesh: secondMesh}
    } else{
        second = null
    }
    if (!(thirdChance == null || thirdMesh == null)){
        third = {chance: thirdChance, mesh: thirdMesh}
    } else{
        third = null
    }
    event.custom({
      type: "exnihilosequentia:sieve",
      rolls: [{
        chance: firstChance,
        mesh: firstMesh
      }, second, third],
      input: Ingredient.of(input).toJson(),
      result: Item.of(output).toResultJson(),
      waterlogged: water
    })
  }

  function hsieve(input, inputOfNormal, multiplyer) {
    event.custom({
      type: "excompressum:heavy_sieve_generated",
      input: Ingredient.of(input).toJson(),
      source: inputOfNormal,
      rolls: multiplyer
    })
  }
  function barrel_fl_to_block(inputfl, inputitem, outputblock){
    event.custom({
      type: "exnihilosequentia:fluid_item",
      fluid: {fluid: inputfl},
      input: Ingredient.of(inputitem).toJson(),
      result: Item.of(outputblock).toResultJson()
    })
  }
  function naturalAltar(input, output, countOutput, aura, time, catalyst){
    if (catalyst == null){
        event.custom({
            type: "naturesaura:altar",
            input: {
                item: input
            },
            output: {
                item: output,
                count: countOutput
            },
            aura_type: "naturesaura:overworld",
            aura: aura,
            time: time
        })
    }
    else{
        event.custom({
            type: "naturesaura:altar",
            input: {
                item: input
            },
            output: {
                item: output,
                count: countOutput
            },
            catalyst: {
                item: catalyst
            },
            aura_type: "naturesaura:overworld",
            aura: aura,
            time: time
        })
    }
  }

//Hammer recipes | input, output(with count) 
event.remove({type: "excompressum:hammer"})
event.remove({id: "exnihilothermal:hammer/ens_dust_obsidian"})
hammer("#minecraft:logs","3x emendatusenigmatica:wood_dust")
hammer("#forge:obsidian","4x emendatusenigmatica:obsidian_dust")

//Compressed Hammer recipes | input, output, count
event.remove({type: "excompressum:compressed_hammer"})
chammer("compressium:cobblestone_1","minecraft:gravel",9)
chammer("compressium:gravel_1","minecraft:sand",9)
chammer("compressium:sand_1","exnihilosequentia:dust",9)
chammer("compressium:stone_1","minecraft:cobblestone",9)
chammer("compressium:endstone_1","exnihilosequentia:crushed_end_stone",9)
chammer("compressium:andesite_1","exnihilosequentia:crushed_andesite",9)
chammer("compressium:granite_1","exnihilosequentia:crushed_granite",9)
chammer("compressium:diorite_1","exnihilosequentia:crushed_diorite",9)
chammer("compressium:netherrack_1","exnihilosequentia:crushed_netherrack",9)
chammer("compressium:obsidian_1","emendatusenigmatica:obsidian_dust",36)

//Sieve recipes | input, output(with count), first_mesh_type, first_chance, second_mesh_type, second_chance, third_mesh_type, third_chance, water?

event.remove({type: "exnihilosequentia:sieve"})

//Dirt Sieve drops | output, chance
const dirt_sieve_drops = new Map([
  ["minecraft:wheat_seeds", 0.2],
  ["minecraft:melon_seeds", 0.05],
  ["minecraft:pumpkin_seeds", 0.05],
  ["minecraft:beetroot_seeds", 0.03],
  ["minecraft:vine", 0.03],
  ["minecraft:cocoa_beans", 0.04],
  ["exnihilosequentia:seed_berry", 0.04],
  ["exnihilosequentia:seed_carrot", 0.05],
  ["exnihilosequentia:seed_fern", 0.01],
  ["exnihilosequentia:seed_cactus", 0.04],
  ["exnihilosequentia:seed_grass", 0.03],
  ["exnihilosequentia:seed_potato", 0.05],
  ["exnihilosequentia:seed_sugarcane", 0.04],
  ["exnihilosequentia:seed_bamboo", 0.03],
  ["exnihilosequentia:seed_large_fern", 0.01],
  ["exnihilosequentia:ancient_spores", 0.05],
  ["exnihilosequentia:seed_oak", 0.03],
  ["exnihilosequentia:seed_darkoak", 0.03],
  ["exnihilosequentia:seed_birch", 0.03],
  ["exnihilosequentia:seed_spruce", 0.03],
  ["exnihilosequentia:seed_acacia", 0.03],
  ["exnihilosequentia:seed_jungle", 0.03],
  ["exnihilosequentia:pebble_blackstone", 0.9],
  ["exnihilosequentia:pebble_basalt", 0.9],
  ["exnihilosequentia:pebble_granite", 0.9],
  ["exnihilosequentia:pebble_diorite", 0.9]
])
for(let drops of dirt_sieve_drops.entries()){
  sieve("minecraft:dirt",drops[0],"string",drops[1],null,null,null,null,null)
}
sieve("minecraft:dirt","exnihilosequentia:pebble_andesite","string",0.9,"string",0.75,null,null,null)
sieve("minecraft:dirt","exnihilosequentia:pebble_stone","string",0.9,"string",0.75,"string",0.6,null)

//Leaves Sieve drops | input, output
 sieve("#minecraft:leaves","minecraft:apple","string",0.025,"iron",0.0125,"emerald",0.00625,null)
 sieve("#minecraft:leaves","minecraft:golden_apple","string",0.0005,"iron",0.00025,"emerald",0.000125,null)
 sieve("#minecraft:leaves","exnihilosequentia:silkworm","string",0.02,"iron",0.01,"emerald",0.005,null)
 
const leaves_sieve_drops = [
  "oak",
  "dark_oak",
  "birch",
  "spruce",
  "acacia",
  "jungle",
]
for(let trees of leaves_sieve_drops){
  sieve("minecraft:" + trees + "_leaves","minecraft:" + trees + "_sapling","string", 0.05,"iron", 0.025,"emerald", 0.0125,null)
}

//Sand Waterlogged Sieve drops | output, chance
const sand_water_sieve_drops = new Map([
  ["exnihilosequentia:seed_kelp", 0.03],
  ["exnihilosequentia:seed_pickle", 0.02],
  ["minecraft:seagrass", 0.1],
  ["exnihilosequentia:seed_purple_coral", 0.03],
  ["exnihilosequentia:seed_pink_coral", 0.03],
  ["exnihilosequentia:seed_blue_coral", 0.03],
  ["exnihilosequentia:seed_yellow_coral", 0.03],
  ["exnihilosequentia:seed_red_coral", 0.03]
])
for(let drops of sand_water_sieve_drops.entries()){
  sieve("#forge:sand",drops[0],"string",drops[1],null,null,null,null,true)
}

//Waterlogged Dirt Sieve drops | output, chance
const dirt_water_sieve_drops = new Map([
  ["pamhc2crops:aridgarden", 0.1],
  ["pamhc2crops:frostgarden", 0.1],
  ["pamhc2crops:shadedgarden", 0.1],
  ["pamhc2crops:soggygarden", 0.1],
  ["pamhc2crops:tropicalgarden", 0.1],
  ["pamhc2crops:windygarden", 0.1]
])
for(let drops of dirt_water_sieve_drops.entries()){
  sieve("minecraft:dirt",drops[0],"string",drops[1],null,null,null,null,true)
}

//String Mesh
 sieve("minecraft:gravel","minecraft:flint","string",0.4,"diamond",0.2,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_iron","string",0.4,"diamond",0.2,null,null,null)
 
 sieve("#forge:sand","minecraft:coal","string",0.25,"diamond",0.125,null,null,null)
 sieve("#forge:sand","minecraft:lapis_lazuli","string",0.1,"diamond",0.05,null,null,null)
 sieve("#forge:sand","exnihilosequentia:piece_iron","string",0.05,"diamond",0.025,null,null,null)
 
 sieve("exnihilosequentia:dust","minecraft:redstone","string",0.2,"diamond",0.1,null,null,null)
 sieve("exnihilosequentia:dust","minecraft:bone_meal","string",0.3,"diamond",0.15,null,null,null)
 sieve("exnihilosequentia:dust","exnihilosequentia:piece_iron","string",0.05,"diamond",0.025,null,null,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:blaze_powder","string",0.15,"diamond",0.075,null,null,null)
 
 sieve("minecraft:soul_sand","minecraft:nether_wart","string",0.05,"diamond",0.025,null,null,null)
 
 sieve("minecraft:coarse_dirt","minecraft:dirt","string",0.8,"string",0.4,null,null,null)
 sieve("minecraft:coarse_dirt","minecraft:gravel","string",0.3,null,null,null,null,null)
 
 
//Tconstruct Slime Dirt
 event.remove({output: "tconstruct:ichor_slime_dirt"})
 event.custom({
  type: "tconstruct:casting_basin",
  cast: {item: "minecraft:dirt"},
  cast_consumed: true,
  fluid: {
    name: "tconstruct:blood",
    amount: 1000
  },
  result: "tconstruct:ichor_slime_dirt",
  cooling_time: 40
 })
 sieve("tconstruct:earth_slime_dirt","minecraft:slime_ball","string",1,"string",0.8,"string",0.6,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:earth_slime_sapling","string",0.05,null,null,null,null,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:sky_slime_ball","string",0.25,null,null,null,null,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:earth_slime_grass_seeds","string",0.05,null,null,null,null,null)
 
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_ball","string",1,"string",0.8,"string",0.6,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:ender_slime_ball","string",0.25,null,null,null,null,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_grass_seeds","string",0.05,null,null,null,null,null)
 
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_ball","string",1,"string",0.8,"string",0.6,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_sapling","string",0.05,null,null,null,null,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_grass_seeds","string",0.05,null,null,null,null,null)
 
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_ball","string",1,"string",0.8,"string",0.6,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_sapling","string",0.05,null,null,null,null,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_grass_seeds","string",0.05,null,null,null,null,null)

//Flint Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_copper","flint",0.3,"emerald",0.15,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_zinc","flint",0.15,"emerald",0.075,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_osmium","flint",0.1,"emerald",0.05,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_tin","flint",0.2,"emerald",0.1,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_aluminum","flint",0.25,"emerald",0.125,null,null,null)
 
 sieve("#forge:sand","minecraft:diamond","flint",0.05,"emerald",0.025,null,null,null)
 sieve("#forge:sand","emendatusenigmatica:apatite_gem","flint",0.1,"emerald",0.05,null,null,null)
 sieve("#forge:sand","emendatusenigmatica:cinnabar_gem","flint",0.1,"emerald",0.05,null,null,null)
 sieve("#forge:sand","emendatusenigmatica:potassium_nitrate_gem","flint",0.1,"emerald",0.05,null,null,null)
 
 sieve("exnihilosequentia:dust","minecraft:gunpowder","flint",0.05,"emerald",0.1,null,null,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:sky_dust","flint",0.1,"emerald",0.05,null,null,null)
 sieve("exnihilosequentia:dust","fluxnetworks:flux_dust","flint",0.03,"emerald",0.015,null,null,null)
 
 sieve("exnihilosequentia:crushed_netherrack","emendatusenigmatica:quartz_dust","flint",0.15,"emerald",0.075,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","minecraft:weeping_vines","flint",0.01,"emerald",0.005,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","minecraft:twisting_vines","flint",0.01,"emerald",0.005,null,null,null)
 
 sieve("exnihilosequentia:crushed_end_stone","minecraft:ender_pearl","flint",0.02,"emerald",0.01,null,null,null)
 
 sieve("minecraft:soul_sand","minecraft:quartz","flint",0.8,"emerald",0.4,null,null,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:nether_quartz_seed","flint",0.3,"emerald",0.15,null,null,null)
 
 sieve("minecraft:nether_wart_block","minecraft:crimson_fungus","flint",0.1,null,null,null,null,null)
 sieve("minecraft:nether_wart_block","minecraft:crimson_roots","flint",0.1,null,null,null,null,null)
 sieve("minecraft:nether_wart_block","minecraft:weeping_vines","flint",0.1,null,null,null,null,null)
 
 sieve("minecraft:warped_wart_block","minecraft:warped_fungus","flint",0.1,null,null,null,null,null)
 sieve("minecraft:warped_wart_block","minecraft:warped_roots","flint",0.1,null,null,null,null,null)
 sieve("minecraft:warped_wart_block","minecraft:twisting_vines","flint",0.1,null,null,null,null,null)
 
//Iron Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_nickel","iron",0.12,"emerald",0.06,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_gold","iron",0.1,"emerald",0.05,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_silver","iron",0.1,"emerald",0.05,null,null,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_uranium","iron",0.08,"emerald",0.04,null,null,null)
 
 sieve("#forge:sand","minecraft:emerald","iron",0.03,"emerald",0.015,null,null,null)
 sieve("#forge:sand","mekanism:salt","iron",0.05,"emerald",0.025,null,null,null)
 sieve("#forge:sand","minecraft:prismarine_shard","iron",0.05,"emerald",0.025,null,null,null)
 sieve("#forge:sand","powah:uraninite","iron",0.06,"emerald",0.03,null,null,null)
 sieve("#forge:sand","emendatusenigmatica:sulfur_gem","iron",0.08,"emerald",0.04,null,null,null)
 sieve("#forge:sand","mysticalagriculture:prosperity_shard","iron",0.1,"emerald",0.05,null,null,null)
 sieve("#forge:sand","byg:ametrine_gems","iron",0.02,"emerald",0.1,null,null,null)

 sieve("exnihilosequentia:dust","minecraft:glowstone_dust","iron",0.1,"emerald",0.05,null,null,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:certus_quartz_dust","iron",0.1,"emerald",0.05,null,null,null)
 sieve("exnihilosequentia:dust","mysticalagriculture:inferium_essence","iron",0.05,"emerald",0.25,null,null,null)
 sieve("exnihilosequentia:dust","bigreactors:yellorium_dust","iron",0.06,"emerald",0.03,null,null,null)
 
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_gold","iron",0.3,"emerald",0.15,null,null,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_crystal_seed","iron",0.2,"emerald",0.1,null,null,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_quartz_crystal","iron",0.4,"emerald",0.2,null,null,null)
 
//Diamond Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_lead","diamond",0.1,"netherite",0.05,null,null,null)
 
 sieve("#forge:sand","minecraft:prismarine_crystals","diamond",0.04,"netherite",0.01,null,null,null)
 
 sieve("exnihilosequentia:dust","appliedenergistics2:fluix_dust","diamond",0.1,"netherite",0.05,null,null,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:bismuth_dust","diamond",0.015,"netherite",0.0075,null,null,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:platinum_dust","diamond",0.02,"netherite",0.01,null,null,null)
 sieve("exnihilosequentia:dust","projectred-core:electrotine_dust","diamond",0.05,"netherite",0.025,null,null,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:netherite_scrap","diamond",0.025,"netherite",0.0125,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_cobalt","diamond",0.06,"netherite",0.03,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","bigreactors:benitoite_crystal","diamond",0.01,"netherite",0.005,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:emeraldite_shards","diamond",0.01,"netherite",0.005,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:raw_pendorite","diamond",0.01,"netherite",0.005,null,null,null)
 sieve("exnihilosequentia:crushed_netherrack","silentgear:crimson_iron_dust","diamond",0.03,"netherite",0.015,null,null,null)
 
 sieve("exnihilosequentia:crushed_end_stone","bigreactors:anglesite_crystal","diamond",0.01,"netherite",0.005,null,null,null)
 sieve("exnihilosequentia:crushed_end_stone","betterendforge:thallasium_nugget","diamond",0.4,"netherite",0.2,null,null,null)
 
 sieve("minecraft:soul_sand","minecraft:ghast_tear","diamond",0.03,"netherite",0.015,null,null,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:charged_certus_quartz_crystal","diamond",0.1,"netherite",0.05,null,null,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal_seed","diamond",0.05,"netherite",0.025,null,null,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal","diamond",0.1,"netherite",0.05,null,null,null)
 
//Emerald Mesh
 sieve("#forge:sand","emendatusenigmatica:fluorite_gem","emerald",0.04,"netherite",0.02,null,null,null)
 sieve("#forge:sand","rftoolsbase:dimensionalshard","emerald",0.03,"netherite",0.015,null,null,null)
 
 sieve("exnihilosequentia:crushed_end_stone","silentgear:azure_silver_dust","emerald",0.03,"netherite",0.015,null,null,null)

//Netherite Mesh
 sieve("exnihilosequentia:dust","draconicevolution:draconium_dust","netherite",0.02,null,null,null,null,null)
 
 sieve("exnihilosequentia:crushed_netherrack","draconicevolution:draconium_dust","netherite",0.035,null,null,null,null,null)
 
 sieve("exnihilosequentia:crushed_end_stone","draconicevolution:draconium_dust","netherite",0.035,null,null,null,null,null)
 
//Heavy Sieve recipes | input, input of normal Sieve recipe, output multiplyer
event.remove({type: "excompressum:heavy_sieve_generated"})
hsieve("compressium:gravel_1", "minecraft:gravel", 9)
hsieve("compressium:sand_1", "minecraft:sand", 9)
hsieve("compressium:dirt_1", "minecraft:dirt", 9)
hsieve("compressium:soulsand_1", "minecraft:soul_sand", 9)
hsieve("excompressum:compressed_dust", "exnihilosequentia:dust", 9)
hsieve("excompressum:compressed_nether_gravel", "exnihilosequentia:crushed_netherrack", 9)
hsieve("excompressum:compressed_ender_gravel", "exnihilosequentia:crushed_end_stone", 9)

//remove compressed recipes
const remove_compressed = [
    "excompressum:compressed_cobblestone",
    "excompressum:compressed_gravel",
    "excompressum:compressed_sand",
    "excompressum:compressed_dirt",
    "excompressum:compressed_flint",
    "excompressum:compressed_soul_sand",
    "excompressum:compressed_netherrack",
    "excompressum:compressed_end_stone",
    "excompressum:compressed_diorite",
    "excompressum:compressed_andesite",
    "excompressum:compressed_granite"
];
remove_compressed.forEach((id) => {
    event.remove({id: id});
})
//Add recipes for compressed crushed andesite, granite and diorite | uncompressed, compressed
const recipes_compressed = new Map([
  ["exnihilosequentia:crushed_andesite","excompressum:compressed_crushed_andesite"],
  ["exnihilosequentia:crushed_granite","excompressum:compressed_crushed_granite"],
  ["exnihilosequentia:crushed_diorite","excompressum:compressed_crushed_diorite"],
])
for(let items of recipes_compressed.entries()){
  event.shaped(items[1], [
    'SSS',
    'SSS',
    'SSS'
  ], {
    S: items[0],
  })
  event.shapeless("9x " + items[0], [items[1]])
}

//oil recipe
event.custom({
    type:"immersiveengineering:mixer",
    inputs:[
        {count:2,base_ingredient:{tag:"minecraft:coals"}}
    ],
    result:{fluid:"immersivepetroleum:oil",amount:1000},
    fluid:{tag:"minecraft:water",amount:3000},
    energy:5000
})
//Barrel fluid to block crafting | Input Fluid, Input Item, Output Block
barrel_fl_to_block("immersivepetroleum:oil", "minecraft:sand", "thermal:oil_sand")
barrel_fl_to_block("immersivepetroleum:oil", "minecraft:red_sand", "thermal:oil_red_sand")

//Adding new Blaze Rod recipe
event.shaped("minecraft:blaze_rod", [
    "SS",
    "SS",
    "SS"
  ], {
  S: "minecraft:blaze_powder",
})

//adding recipe for End Cake and removing old one
event.remove({id: "exnihilosequentia:ens_end_cake"})
event.recipes.extendedcrafting.shaped_table("exnihilosequentia:end_cake", [
    "AABAA",
    "AGDCA",
    "BEFEB",
    "ACDGA",
    "AABAA"
  ],{
  A: "minecraft:ender_eye",
  B: "compressium:endstone_2",
  C: "minecraft:end_crystal",
  D: "compressium:obsidian_2",
  E: "minecraft:netherite_ingot",
  F: "minecraft:cake",
  G: "silentgear:azure_electrum_ingot"
})

//New Mesh recipes
//removing old ones
const remove_meshes = [
  "exnihilosequentia:ens_mesh_flint",
  "exnihilosequentia:ens_mesh_iron",
  "exnihilosequentia:ens_mesh_diamond",
  "exnihilosequentia:ens_mesh_emerald",
  "exnihilosequentia:ens_mesh_netherite"
];
remove_meshes.forEach((id) => {
    event.remove({id: id});
})
//Flint
event.recipes.createMixing("exnihilosequentia:mesh_flint", [
  "exnihilosequentia:mesh_string",
  "6x minecraft:flint",
]).heated()

//Iron
event.recipes.createMechanicalCrafting("exnihilosequentia:mesh_iron", [
    "CBC",
    "CAC",
    "CBC"
  ],{
  A: "exnihilosequentia:mesh_flint",
  B: "#forge:ingots/steel",
  C: "minecraft:iron_ingot"
})

//Diamond
event.recipes.immersiveengineeringArcFurnace(
  ["exnihilosequentia:mesh_diamond"], 
  "exnihilosequentia:mesh_iron", 
  [
    {item: "minecraft:diamond", count: 8},
    {item: "create:precision_mechanism"}
  ]).time(200).energy(102400)
  
//Emerald
event.custom({
  type: "silents_mechanisms:alloy_smelting",
  process_time: 200,
  ingredients: [
    {value: 
      {item: "exnihilosequentia:mesh_diamond"},
      count: 1
    },
    {value: 
      {item: "naturesaura:infused_iron"},
      count: 4
    },
    {value: 
      {item: "minecraft:emerald"},
      count: 8
    }
  ],
  result: {item: "exnihilosequentia:mesh_emerald"}
})

//Netherite
event.recipes.thermal.smelter("exnihilosequentia:mesh_netherite", [
  "exnihilosequentia:mesh_emerald",
  "2x minecraft:netherite_ingot",
  "4x industrialforegoing:pink_slime_ingot"
  ]).energy(4000)
  
//New Doll recipes
event.shaped("3x exnihilosequentia:doll_crafting", [
    "CBC",
    " C ",
    "C C"
  ],{
  C: "exnihilosequentia:porcelain_clay",
  B: "minecraft:gold_ingot",
})
event.shaped("2x exnihilosequentia:doll_crafting", [
    "CBC",
    " C ",
    "C C"
  ],{
  C: "exnihilosequentia:porcelain_clay",
  B: "minecraft:iron_ingot",
})

event.remove({id: "exnihilosequentia:ens_doll_blaze"})
event.shaped("exnihilosequentia:doll_blaze", [
    "FAF",
    "DED",
    "CBC"
  ],{
  A: "minecraft:redstone",
  B: "minecraft:nether_wart",
  C: "minecraft:blaze_rod",
  D: "minecraft:coal",
  E: "exnihilosequentia:doll_crafting",
  F: "minecraft:blaze_powder"
})
event.remove({id: "exnihilosequentia:ens_doll_basalz"})
event.shaped("exnihilosequentia:doll_basalz", [
    "CAC",
    "DED",
    "CBC"
  ],{
  A: "minecraft:redstone",
  B: "minecraft:nether_wart",
  C: "#forge:dusts/obsidian",
  D: "minecraft:glowstone_dust",
  E: "exnihilosequentia:doll_crafting"
})
event.remove({id: "exnihilosequentia:ens_doll_blitz"})
event.shaped("exnihilosequentia:doll_blitz", [
    "CAC",
    "DED",
    "CBC"
  ],{
  A: "minecraft:redstone",
  B: "minecraft:nether_wart",
  C: "#forge:dusts/niter",
  D: "minecraft:glowstone_dust",
  E: "exnihilosequentia:doll_crafting"
})

//remove Mana Hammer from excompressum recipe
event.remove({id: "excompressum:mana_hammer"})

//Spawn egg recipes
//Wither Skeleton
event.shaped("minecraft:wither_skeleton_spawn_egg", [
    "ABA",
    "CBD",
    "BEB"
  ],{
  A: "minecraft:coal",
  B: "minecraft:bone",
  C: "minecraft:stone_sword",
  D: "minecraft:coal_block",
  E: "minecraft:skeleton_spawn_egg"
})
//piglins
event.shaped("minecraft:zombified_piglin_spawn_egg", [
    "ABA",
    "CBD",
    "AEA"
  ],{
  A: "minecraft:porkchop",
  B: "minecraft:bone",
  C: "minecraft:golden_sword",
  D: "minecraft:vine",
  E: "minecraft:zombie_spawn_egg"
})
event.remove({id: "thermal:lightning_charge/zombified_piglin_from_pig"})
event.shaped("minecraft:piglin_spawn_egg", [
    " A ",
    "BCD",
    " E "
  ],{
  A: "minecraft:leather_chestplate",
  B: "minecraft:crossbow",
  C: "minecraft:leather_leggings",
  D: "minecraft:gold_block",
  E: "minecraft:zombified_piglin_spawn_egg"
})
event.shaped("minecraft:piglin_brute_spawn_egg", [
    " A ",
    "BAC",
    " D "
  ],{
  A: "#forge:dyes/black",
  B: "minecraft:golden_axe",
  C: "minecraft:gold_block",
  D: "minecraft:piglin_spawn_egg"
})
//ghast
event.shaped("minecraft:ghast_spawn_egg", [
    "ABA",
    "CDC",
    "ABA"
  ],{
  A: "minecraft:ghast_tear",
  B: "minecraft:gunpowder",
  C: "minecraft:fire_charge",
  D: "minecraft:egg"
})
//Zoglin and Hoglin
event.shaped("minecraft:zoglin_spawn_egg", [
    "ABA",
    "CDC",
    "ABA"
  ],{
  A: "minecraft:porkchop",
  B: "minecraft:bone",
  C: "minecraft:pig_spawn_egg",
  D: "minecraft:vine"
})
event.shaped("minecraft:hoglin_spawn_egg", [
    " A ",
    "ABA",
    " A "
  ],{
  A: "minecraft:leather",
  B: "minecraft:zoglin_spawn_egg",
})
//slime
event.shaped("minecraft:slime_spawn_egg", [
    "CAC",
    "ABA",
    "CAC"
  ],{
  A: "minecraft:slime_block",
  B: "minecraft:egg",
  C: "minecraft:slime_ball"
})

//soulstone recipe
event.shaped("4x mysticalagriculture:soulstone", [
    " A ",
    "ABA",
    " A "
  ],{
  A: "minecraft:stone",
  B: "minecraft:soul_soil"
})

//Soulium ore recipe
//slime
event.shaped("mysticalagriculture:soulium_ore", [
    "CAC",
    "ABA",
    "CAC"
  ],{
  A: "minecraft:stone",
  B: "mysticalagriculture:prudentium_essence",
  C: "mysticalagriculture:soulstone"
})

//Simple farming "bushes"
event.shaped("simplefarming:blackberry_bush", [
    "ABA",
    "BBB",
    "BCB"
  ],{
  A: "pamhc2crops:blackberryitem",
  B: "#minecraft:leaves",
  C: "minecraft:stick"
})
event.shaped("simplefarming:blueberry_bush", [
    "ABA",
    "BBB",
    "BCB"
  ],{
  A: "pamhc2crops:blueberryitem",
  B: "#minecraft:leaves",
  C: "minecraft:stick"
})
event.shaped("simplefarming:raspberry_bush", [
    "ABA",
    "BBB",
    "BCB"
  ],{
  A: "pamhc2crops:raspberryitem",
  B: "#minecraft:leaves",
  C: "minecraft:stick"
})
event.shaped("simplefarming:strawberry_bush", [
    "ABA",
    "BBB",
    "BCB"
  ],{
  A: "pamhc2crops:strawberryitem",
  B: "#minecraft:leaves",
  C: "minecraft:stick"
})

//bottled ghosts
event.shaped(Item.of('naturesaura:aura_bottle', 4, '{stored_type:"naturesaura:nether"}'), [
    "CAC",
    "ABA",
    "CAC"
  ],{
  A: "minecraft:white_wool",
  B: "minecraft:ghast_tear",
  C: "naturesaura:bottle_two_the_rebottling"
})

//Industrial Foregoing Laser
event.replaceInput({id: "industrialforegoing:ore_laser_base"}, 'minecraft:redstone', '#forge:ingots/draconium')
event.replaceInput({id: "industrialforegoing:fluid_laser_base"}, 'minecraft:redstone', '#forge:ingots/draconium')

//botania Orechid
event.remove({id: "botania:petal_apothecary/orechid"})
event.remove({id: "botania:petal_apothecary/orechid_ignem"})
event.custom({
    type: "botania:petal_apothecary",
    output: {item: "botania:orechid"},
    ingredients: [
      {
        tag: "botania:petals/gray"
      },{
        tag: "botania:petals/gray"
      },{
        tag: "botania:petals/yellow"
      },{
        tag: "botania:petals/green"
      },{
        tag: "botania:petals/red"
      },{
        tag: "botania:runes/pride"
      },{
        tag: "botania:runes/greed"
      },{
        item: "minecraft:netherite_ingot"
      },{
        item: "botania:redstone_root"
      },{
        item: "botania:pixie_dust"
      }
    ]
})
event.custom({
  type: "botania:petal_apothecary",
  output: {item: "botania:orechid_ignem"},
  ingredients: [
    {
      tag: "botania:petals/red"
    },{
      tag: "botania:petals/red"
    },{
      tag: "botania:petals/white"
    },{
      tag: "botania:petals/white"
    },{
      tag: "botania:petals/pink"
    },{
      tag: "botania:runes/pride"
    },{
      tag: "botania:runes/greed"
    },{
      item: "minecraft:netherite_ingot"
    },{
      item: "botania:redstone_root"
    },{
      item: "botania:pixie_dust"
    }
  ]
})

//remove Crucible recipes from exnihilo
event.remove({output: "#exnihilosequentia:crucibles"})

//New Press recipes (ae2)
event.recipes.extendedcrafting.shaped_table("appliedenergistics2:silicon_press", [
    "ABABA",
    "BACAB",
    "AC CA",
    "BACAB",
    "ABABA"
], {
    A: "#forge:ingots/steel",
    B: "minecraft:iron_block",
    C: "#forge:silicon"
})
event.recipes.extendedcrafting.shaped_table("appliedenergistics2:logic_processor_press", [
    "ABABA",
    "BACAB",
    "AC CA",
    "BACAB",
    "ABABA"
], {
    A: "#forge:ingots/steel",
    B: "minecraft:iron_block",
    C: "minecraft:gold_block"
})
event.recipes.extendedcrafting.shaped_table("appliedenergistics2:engineering_processor_press", [
    "ABABA",
    "BACAB",
    "AC CA",
    "BACAB",
    "ABABA"
], {
    A: "#forge:ingots/steel",
    B: "minecraft:iron_block",
    C: "minecraft:diamond"
})
event.recipes.extendedcrafting.shaped_table("appliedenergistics2:calculation_processor_press", [
    "ABABA",
    "BACAB",
    "AC CA",
    "BACAB",
    "ABABA"
], {
    A: "#forge:ingots/steel",
    B: "minecraft:iron_block",
    C: "appliedenergistics2:quartz_block"
})

//New recipes for Dust
event.remove({id: "create:crushing/sand"})
event.custom({
  type: "create:crushing",
  ingredients: [{item: "minecraft:sand"}],
  results: [
    {item: "exnihilosequentia:dust"},
    {item: "minecraft:bone_meal",chance: 0.1}
  ],
  processingTime: 150
})
event.remove({id: "create:milling/sand"})
event.custom({
  type: "create:milling",
  ingredients: [{item: "minecraft:sand"}],
  results: [
    {item: "exnihilosequentia:dust"}
  ],
  processingTime: 150
})
event.custom({
  type: "mekanism:crushing",
  input:{ingredient:{tag: "forge:sand"}},
  output:{item: "exnihilosequentia:dust"}
})

//Adding recipes for Wart Blocks
barrel_fl_to_block("exnihilosequentia:witchwater", "minecraft:weeping_vines", "minecraft:nether_wart_block")
barrel_fl_to_block("exnihilosequentia:witchwater", "minecraft:twisting_vines", "minecraft:warped_wart_block")

//Adding and removing Crimson altar recipes to natural altar
naturalAltar("minecraft:red_mushroom", "minecraft:crimson_fungus", 1, 30000, 250, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:blackstone", "minecraft:gilded_blackstone", 1, 50000,300, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:sand", "minecraft:soul_sand", 1, 5000, 100, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:brown_mushroom", "minecraft:warped_fungus", 1, 30000, 250, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:gold_block", "naturesaura:tainted_gold_block", 1, 135000, 700, null)
naturalAltar("minecraft:blaze_rod", "minecraft:blaze_powder", 4, 5000, 60, "naturesaura:crushing_catalyst")
naturalAltar(`Item.of('naturesaura:aura_bottle', '{stored_type:"naturesaura:end"}')`, "minecraft:dragon_breath", 1, 20000, 80, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:glowstone", "minecraft:glowstone_dust", 4, 3000, 40, "naturesaura:crushing_catalyst")
naturalAltar("minecraft:crimson_fungus", "minecraft:nether_wart", 1, 30000, 250, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:prismarine_shard", "minecraft:prismarine_crystals", 1, 55000, 200, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:rabbit_stew", "minecraft:rabbit_foot", 1, 15000, 80, "naturesaura:conversion_catalyst")
naturalAltar("minecraft:gold_ingot", "naturesaura:tainted_gold", 1, 15000, 80, null)

event.remove({id: "naturesaura:altar/tainted_gold_block"});

//changing Apple sapling Botany Pot recipe
event.custom({
    type: "botanypots:crop",
    conditions: [{}],
    seed: {item: "simplefarming:apple_sapling"},
    categories: ["dirt"],
    growthTicks: 2400,
    display: {block: "simplefarming:apple_sapling"},
    results: [{
            chance: 0.50,
            output: {item: "simplefarming:fruit_log"},
            minRolls: 1,
            maxRolls: 1
        },{
            chance: 0.05,
            output: {item: "minecraft:apple"},
            minRolls: 1,
            maxRolls: 2
        },{
            chance: 0.05,
            output: {item: "simplefarming:apple_sapling"},
            minRolls: 1,
            maxRolls: 1
        }
    ]
})
event.remove({type: "botanypots:crop", input: "simplefarming:apple_sapling"})

//new crushing recipes for crushed skystone 
event.custom({
  type: "create:crushing",
  ingredients: [{item: "appliedenergistics2:sky_stone_block"}],
  results: [
    {item: "exnihiloae:crushed_skystone"},
  ],
  processingTime: 150
})
event.custom({
  type: "create:milling",
  ingredients: [{item: "appliedenergistics2:sky_stone_block"}],
  results: [
    {item: "exnihiloae:crushed_skystone"}
  ],
  processingTime: 150
})
event.custom({
  type: "mekanism:crushing",
  input:{item: "appliedenergistics2:sky_stone_block"},
  output:{item: "exnihiloae:crushed_skystone"}
})
event.custom({
  type: "thermal:pulverizer",
  ingredient: {item: "appliedenergistics2:sky_stone_block"},
  result: [{item: "exnihiloae:crushed_skystone"}],
  experience: 0.5
})

//removing nether portal pet recipe
event.remove({id: "inventorypets:nether_portal_pet"})

//adding a basalt recipe for chisels basalt
event.shaped("6x chisel:basalt/raw", [
    "CAC",
    "CBC",
    "CAC"
  ],{
  A: "minecraft:stone",
  B: "minecraft:black_dye",
  C: "minecraft:basalt"
})

//Adding more heat recipes
event.custom({
  type: "exnihilosequentia:heat",
  block: "create:blaze_burner",
  amount: 4,
  state: {
    blaze: "smouldering"
  }
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "emendatusenigmatica:uranium_block",
  amount: 5
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "powah:blazing_crystal_block",
  amount: 5
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "create:blaze_burner",
  amount: 6,
  state: {
    blaze: "fading"
  }
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "tconstruct:blazing_blood_fluid",
  amount: 6
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "create:blaze_burner",
  amount: 7,
  state: {
    blaze: "kindled"
  }
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "create:blaze_burner",
  amount: 9,
  state: {
    blaze: "seething"
  }
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "projecte:dark_matter_block",
  amount: 10
})
event.custom({
  type: "exnihilosequentia:heat",
  block: "projecte:red_matter_block",
  amount: 12
})

//adding a recipe for the pillager spawn egg
event.shaped("minecraft:pillager_spawn_egg", [
    " A ",
    "ABC",
    " A "
  ],{
    A: "minecraft:gray_dye",
    B: "minecraft:villager_spawn_egg",
    C: "minecraft:crossbow"
})

//removing the netherite scrap dupe recipe
event.remove({id: "minecraft:ens_ancient_debris"})

//adding a recipe for the elder guardian spawn egg
event.shaped("minecraft:elder_guardian_spawn_egg", [
    "CAC",
    "ABA",
    "DAD"
  ],{
    A: "minecraft:guardian_spawn_egg",
    B: "minecraft:egg",
    C: "minecraft:blue_dye",
    D: "minecraft:gray_dye"
})


//adding new recipes for deepslate from quark
event.shaped("3x quark:cobbled_deepslate", [
    "CAC",
    "CBC",
    "CAC"
  ],{
    A:"minecraft:black_dye",
    B:"minecraft:coal",
    C:"minecraft:cobblestone"
})
event.shaped("3x quark:deepslate", [
    "CAC",
    "CBC",
    "CAC"
  ],{
    A:"minecraft:black_dye",
    B:"minecraft:coal",
    C:"minecraft:stone"
})
event.shaped("15x quark:cobbled_deepslate", [
    "CAC",
    "CBC",
    "CAC"
  ],{
    A:"mysticalagriculture:dye_essence",
    B:"mysticalagriculture:coal_essence",
    C:"mysticalagriculture:stone_essence"
})
event.shaped("15x quark:deepslate", [
    "CAC",
    "CBC",
    "CAC"
  ],{
    B:"mysticalagriculture:dye_essence",
    A:"mysticalagriculture:coal_essence",
    C:"mysticalagriculture:stone_essence"
})
//removing flux recipe
event.remove({type: "minecraft:crafting_shaped", output: "9x fluxnetworks:flux_dust"})

//removing old marble recipe
event.remove({id: "enviromats:blocks/craft_raw/marble"})
//Adding new Marble recipes
event.shaped("8x quark:marble",[
    "AAA",
    "BCB",
    "AAA"
],{
    A:"minecraft:diorite",
    B:"minecraft:stone",
    C:"minecraft:quartz"
})
event.shaped("8x chisel:marble/raw",[
    "AAA",
    "ABA",
    "AAA"
],{
    A:"quark:marble",
    B:"minecraft:quartz"
})
event.shaped("8x enviromats:marble",[
    "AAA",
    "ABA",
    "AAA"
],{
    A:"chisel:marble/raw",
    B:"minecraft:quartz"
})
})
