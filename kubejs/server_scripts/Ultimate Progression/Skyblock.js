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

  function sieve(input, output, mesh, chance, water) {
    event.custom({
      type: "exnihilosequentia:sieve",
      rolls: [{
        chance: chance,
        mesh: mesh
      }],
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

//Sieve recipes | input, output(with count), mesh_type, chance, water?

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
  ["exnihilosequentia:pebble_stone", 0.9],
  ["exnihilosequentia:pebble_blackstone", 0.5],
  ["exnihilosequentia:pebble_basalt", 0.5],
  ["exnihilosequentia:pebble_granite", 0.5],
  ["exnihilosequentia:pebble_diorite", 0.5],
  ["exnihilosequentia:pebble_andesite", 0.5]
])
for(let drops of dirt_sieve_drops.entries()){
  sieve("minecraft:dirt",drops[0],"string",drops[1],null)
}

//Leaves Sieve drops | input, output
 sieve("#minecraft:leaves","minecraft:apple","string",0.025,null)
 sieve("#minecraft:leaves","minecraft:golden_apple","string",0.0005,null)
 sieve("#minecraft:leaves","exnihilosequentia:silkworm","string",0.02,null)
 
 sieve("#minecraft:leaves","minecraft:apple","iron",0.0125,null)
 sieve("#minecraft:leaves","minecraft:golden_apple","iron",0.00025,null)
 sieve("#minecraft:leaves","exnihilosequentia:silkworm","iron",0.01,null)
 
 sieve("#minecraft:leaves","minecraft:apple","emerald",0.00625,null)
 sieve("#minecraft:leaves","minecraft:golden_apple","emerald",0.000125,null)
 sieve("#minecraft:leaves","exnihilosequentia:silkworm","emerald",0.005,null)
 
const leaves_sieve_drops = [
  "oak",
  "dark_oak",
  "birch",
  "spruce",
  "acacia",
  "jungle",
]
for(let trees of leaves_sieve_drops){
  sieve("minecraft:" + trees + "_leaves","minecraft:" + trees + "_sapling","string", 0.05,null)
  sieve("minecraft:" + trees + "_leaves","minecraft:" + trees + "_sapling","iron", 0.025,null)
  sieve("minecraft:" + trees + "_leaves","minecraft:" + trees + "_sapling","emerald", 0.0125,null)
}

//Sand Waterlogged  Sieve drops | output, chance
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
  sieve("#forge:sand",drops[0],"string",drops[1],true)
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
  sieve("minecraft:dirt",drops[0],"string",drops[1],true)
}

//String Mesh
 sieve("minecraft:gravel","minecraft:flint","string",0.2,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_iron","string",0.15,null)
 
 sieve("#forge:sand","minecraft:coal","string",0.15,null)
 sieve("#forge:sand","minecraft:lapis_lazuli","string",0.075,null)
 
 sieve("exnihilosequentia:dust","minecraft:redstone","string",0.1,null)
 sieve("exnihilosequentia:dust","minecraft:bone_meal","string",0.15,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:blaze_powder","string",0.075,null)
 
 sieve("minecraft:soul_sand","minecraft:nether_wart","string",0.05,null)
 
 sieve("minecraft:coarse_dirt","minecraft:dirt","string",0.8,null)
 sieve("minecraft:coarse_dirt","minecraft:dirt","string",0.4,null)
 sieve("minecraft:coarse_dirt","minecraft:gravel","string",0.3,null)
 
 
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
 sieve("tconstruct:earth_slime_dirt","minecraft:slime_ball","string",1,null)
 sieve("tconstruct:earth_slime_dirt","minecraft:slime_ball","string",0.75,null)
 sieve("tconstruct:earth_slime_dirt","minecraft:slime_ball","string",0.5,null)
 sieve("tconstruct:earth_slime_dirt","minecraft:slime_ball","string",0.25,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:earth_slime_sapling","string",0.05,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:sky_slime_ball","string",0.25,null)
 sieve("tconstruct:earth_slime_dirt","tconstruct:earth_slime_grass_seeds","string",0.05,null)
 
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_ball","string",1,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_ball","string",0.75,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_ball","string",0.5,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_ball","string",0.25,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:ender_slime_ball","string",0.25,null)
 sieve("tconstruct:ichor_slime_dirt","tconstruct:blood_slime_grass_seeds","string",0.05,null)
 
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_ball","string",1,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_ball","string",0.75,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_ball","string",0.5,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_ball","string",0.25,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_sapling","string",0.05,null)
 sieve("tconstruct:sky_slime_dirt","tconstruct:sky_slime_grass_seeds","string",0.05,null)
 
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_ball","string",1,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_ball","string",0.75,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_ball","string",0.5,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_ball","string",0.25,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_sapling","string",0.05,null)
 sieve("tconstruct:ender_slime_dirt","tconstruct:ender_slime_grass_seeds","string",0.05,null)
 
//Flint Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_copper","flint",0.2,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_zinc","flint",0.1,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_osmium","flint",0.05,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_tin","flint",0.1,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_aluminum","flint",0.15,null)
 
 sieve("#forge:sand","minecraft:diamond","flint",0.03,null)
 sieve("#forge:sand","emendatusenigmatica:apatite_gem","flint",0.1,null)
 sieve("#forge:sand","emendatusenigmatica:cinnabar_gem","flint",0.1,null)
 sieve("#forge:sand","emendatusenigmatica:potassium_nitrate_gem","flint",0.1,null)
 
 sieve("exnihilosequentia:dust","minecraft:gunpowder","flint",0.05,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:sky_dust","flint",0.08,null)
 sieve("exnihilosequentia:dust","fluxnetworks:flux_dust","flint",0.02,null)
 
 sieve("exnihilosequentia:crushed_netherrack","emendatusenigmatica:quartz_dust","flint",0.1,null)
 
 sieve("exnihilosequentia:crushed_end_stone","minecraft:ender_pearl","flint",0.01,null)
 
 sieve("minecraft:soul_sand","minecraft:quartz","flint",0.7,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:nether_quartz_seed","flint",0.2,null)
 
//Iron Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_nickel","iron",0.08,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_gold","iron",0.05,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_silver","iron",0.06,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_uranium","iron",0.04,null)
 
 sieve("#forge:sand","minecraft:emerald","iron",0.02,null)
 sieve("#forge:sand","mekanism:salt","iron",0.05,null)
 sieve("#forge:sand","minecraft:prismarine_shard","iron",0.03,null)
 sieve("#forge:sand","powah:uraninite","iron",0.05,null)
 sieve("#forge:sand","emendatusenigmatica:sulfur_gem","iron",0.05,null)
 sieve("#forge:sand","mysticalagriculture:prosperity_shard","iron",0.05,null)
 sieve("#forge:sand","byg:ametrine_gems","iron",0.02,null)

 sieve("exnihilosequentia:dust","minecraft:glowstone_dust","iron",0.075,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:certus_quartz_dust","iron",0.1,null)
 sieve("exnihilosequentia:dust","mysticalagriculture:inferium_essence","iron",0.05,null)
 sieve("exnihilosequentia:dust","bigreactors:yellorium_dust","iron",0.05,null)
 
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_gold","iron",0.15,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_crystal_seed","iron",0.15,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_quartz_crystal","iron",0.4,null)
 
//Diamond Mesh
 sieve("minecraft:gravel","exnihilosequentia:piece_lead","diamond",0.07,null)
 
 sieve("#forge:sand","minecraft:prismarine_crystals","diamond",0.02,null)
 
 sieve("exnihilosequentia:dust","appliedenergistics2:fluix_dust","diamond",0.1,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:bismuth_dust","diamond",0.01,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:platinum_dust","diamond",0.012,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:netherite_scrap","diamond",0.005,null)
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_cobalt","diamond",0.03,null)
 sieve("exnihilosequentia:crushed_netherrack","bigreactors:benitoite_crystal","diamond",0.005,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:emeraldite_shards","diamond",0.005,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:raw_pendorite","diamond",0.005,null)
 sieve("exnihilosequentia:crushed_netherrack","silentgear:crimson_iron_dust","diamond",0.03,null)
 
 sieve("exnihilosequentia:crushed_end_stone","bigreactors:anglesite_crystal","diamond",0.01,null)
 sieve("exnihilosequentia:crushed_end_stone","betterendforge:thallasium_nugget","diamond",0.4,null)
 
 sieve("minecraft:soul_sand","minecraft:ghast_tear","diamond",0.01,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:charged_certus_quartz_crystal","diamond",0.1,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal_seed","diamond",0.075,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal","diamond",0.1,null)
 
//from string mesh giving a higher chance
 sieve("minecraft:gravel","minecraft:flint","diamond",0.10,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_iron","diamond",0.075,null)
 
 sieve("#forge:sand","minecraft:coal","diamond",0.075,null)
 sieve("#forge:sand","minecraft:lapis_lazuli","diamond",0.0375,null)
 
 sieve("exnihilosequentia:dust","minecraft:redstone","diamond",0.05,null)
 sieve("exnihilosequentia:dust","minecraft:bone_meal","diamond",0.075,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:blaze_powder","diamond",0.0375,null)
 
 sieve("minecraft:soul_sand","minecraft:nether_wart","diamond",0.025,null)
 
//Emerald Mesh
 sieve("#forge:sand","emendatusenigmatica:fluorite_gem","emerald",0.03,null)
 sieve("#forge:sand","rftoolsbase:dimensionalshard","emerald",0.02,null)
 
 sieve("exnihilosequentia:crushed_end_stone","silentgear:azure_silver_dust","emerald",0.025,null)
 
//from flint mesh giving a higher chance
 sieve("minecraft:gravel","exnihilosequentia:piece_copper","emerald",0.1,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_zinc","emerald",0.05,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_osmium","emerald",0.025,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_tin","emerald",0.05,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_aluminum","emerald",0.075,null)
 
 sieve("#forge:sand","minecraft:diamond","emerald",0.015,null)
 sieve("#forge:sand","emendatusenigmatica:apatite_gem","emerald",0.05,null)
 sieve("#forge:sand","emendatusenigmatica:cinnabar_gem","emerald",0.05,null)
 sieve("#forge:sand","emendatusenigmatica:potassium_nitrate_gem","emerald",0.05,null)
 
 sieve("exnihilosequentia:dust","minecraft:gunpowder","emerald",0.025,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:sky_dust","emerald",0.04,null)
 sieve("exnihilosequentia:dust","fluxnetworks:flux_dust","emerald",0.01,null)
 
 sieve("exnihilosequentia:crushed_netherrack","emendatusenigmatica:quartz_dust","emerald",0.05,null)
 
 sieve("exnihilosequentia:crushed_end_stone","minecraft:ender_pearl","emerald",0.005,null)
 
 sieve("minecraft:soul_sand","minecraft:quartz","emerald",0.35,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:nether_quartz_seed","emerald",0.1,null)
 
//from iron mesh giving a higher chance
 sieve("minecraft:gravel","exnihilosequentia:piece_nickel","emerald",0.04,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_gold","emerald",0.025,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_silver","emerald",0.03,null)
 sieve("minecraft:gravel","exnihilosequentia:piece_uranium","emerald",0.02,null)
 
 sieve("#forge:sand","minecraft:emerald","emerald",0.01,null)
 sieve("#forge:sand","mekanism:salt","emerald",0.025,null)
 sieve("#forge:sand","minecraft:prismarine_shard","emerald",0.015,null)
 sieve("#forge:sand","powah:uraninite","emerald",0.025,null)
 sieve("#forge:sand","emendatusenigmatica:sulfur_gem","emerald",0.025,null)
 sieve("#forge:sand","mysticalagriculture:prosperity_shard","emerald",0.015,null)
 sieve("#forge:sand","byg:ametrine_gems","emerald",0.01,null)

 sieve("exnihilosequentia:dust","minecraft:glowstone_dust","emerald",0.0375,null)
 sieve("exnihilosequentia:dust","appliedenergistics2:certus_quartz_dust","emerald",0.05,null)
 sieve("exnihilosequentia:dust","mysticalagriculture:inferium_essence","emerald",0.025,null)
 sieve("exnihilosequentia:dust","bigreactors:yellorium_dust","emerald",0.025,null)
 
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_gold","emerald",0.075,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_crystal_seed","emerald",0.075,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:certus_quartz_crystal","emerald",0.2,null)

//Netherite Mesh
 sieve("exnihilosequentia:dust","draconicevolution:draconium_dust","netherite",0.006,null)
 
 sieve("exnihilosequentia:crushed_netherrack","draconicevolution:draconium_dust","netherite",0.01,null)
 
 sieve("exnihilosequentia:crushed_end_stone","draconicevolution:draconium_dust","netherite",0.01,null)
 
//from diamond mesh giving a higher chance
 sieve("minecraft:gravel","exnihilosequentia:piece_lead","netherite",0.035,null)
 
 sieve("#forge:sand","minecraft:prismarine_crystals","netherite",0.01,null)
 
 sieve("exnihilosequentia:dust","appliedenergistics2:fluix_dust","netherite",0.05,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:bismuth_dust","netherite",0.005,null)
 sieve("exnihilosequentia:dust","silents_mechanisms:platinum_dust","diamond",0.006,null)
 
 sieve("exnihilosequentia:crushed_netherrack","minecraft:netherite_scrap","netherite",0.0025,null)
 sieve("exnihilosequentia:crushed_netherrack","exnihilosequentia:piece_cobalt","netherite",0.015,null)
 sieve("exnihilosequentia:crushed_netherrack","bigreactors:benitoite_crystal","netherite",0.0025,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:emeraldite_shards","netherite",0.0025,null)
 sieve("exnihilosequentia:crushed_netherrack","byg:raw_pendorite","netherite",0.0025,null)
 sieve("exnihilosequentia:crushed_netherrack","silentgear:crimson_iron_dust","diamond",0.015,null)
 
 sieve("exnihilosequentia:crushed_end_stone","bigreactors:anglesite_crystal","netherite",0.005,null)
 sieve("exnihilosequentia:crushed_end_stone","betterendforge:thallasium_nugget","netherite",0.2,null)
 
 sieve("minecraft:soul_sand","minecraft:ghast_tear","netherite",0.005,null)
 
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:charged_certus_quartz_crystal","netherite",0.05,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal_seed","netherite",0.0375,null)
 sieve("exnihiloae:crushed_skystone","appliedenergistics2:fluix_crystal","netherite",0.05,null)
 
//from emerald mesh giving a higher chance
 sieve("#forge:sand","emendatusenigmatica:fluorite_gem","netherite",0.015,null)
 sieve("#forge:sand","rftoolsbase:dimensionalshard","netherite",0.01,null)
 
 sieve("exnihilosequentia:crushed_end_stone","silentgear:azure_silver_dust","netherite",0.0125,null)

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
    result:{fluid:"thermal:crude_oil",amount:1000},
    fluid:{tag:"minecraft:water",amount:3000},
    energy:5000
})
//Barrel fluid to block crafting | Input Fluid, Input Item, Output Block
barrel_fl_to_block("thermal:crude_oil", "minecraft:sand", "thermal:oil_sand")
barrel_fl_to_block("thermal:crude_oil", "minecraft:red_sand", "thermal:oil_red_sand")

//Silent's Mechanism refining using thermal oil
event.custom({
  type: "silents_mechanisms:refining",
  process_time: 600,
  ingredient: {fluid: "thermal:crude_oil"},
  results: [
  {fluid: "silents_mechanisms:diesel",amount: 1000},
  {fluid: "silents_mechanisms:ethane",amount: 1000}
  ]
})


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
    "CAC",
    "DED",
    "CBC"
  ],{
  A: "minecraft:redstone",
  B: "minecraft:nether_wart",
  C: "minecraft:blaze_rod",
  D: "minecraft:coal",
  E: "exnihilosequentia:doll_crafting"
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

//Ex Nihilo Guide
event.shapeless(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:ultimate_progression_sky_exnihilo_guide"}'), ["minecraft:book", "#exnihilosequentia:sieves"])

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
})
