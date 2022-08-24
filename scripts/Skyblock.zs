#priority 5
//Cyclic miner
mods.extendedcrafting.TableCrafting.remove(<item:cyclic:miner>);
craftingTable.addShaped("cyclic.miner/skyblock", <item:cyclic:miner>, [
    [<item:minecraft:lapis_block>, <item:minecraft:obsidian>, <item:minecraft:lapis_block>],
    [<item:cyclic:mason_plate>, <item:minecraft:iron_pickaxe>, <item:cyclic:mason_plate>],
    [<item:cyclic:mason_plate>, <item:compressium:cobblestone_1>, <item:cyclic:mason_plate>]
]);

//Rftools
craftingTable.removeByName("crafttweaker:machine_frame_custum");
craftingTable.removeByName("crafttweaker:rftoolsbase.machine_base");
craftingTable.addShaped("rftoolsbase.machine_frame/skyblock", <item:rftoolsbase:machine_frame>, [
    [<item:silents_mechanisms:aluminum_steel_ingot>, <item:rftoolsbase:dimensionalshard>, <item:silents_mechanisms:aluminum_steel_ingot>],
    [<item:minecraft:iron_block>, <item:minecraft:gold_block>, <item:minecraft:iron_block>],
    [<item:silents_mechanisms:aluminum_steel_ingot>, <item:minecraft:lapis_block>, <item:silents_mechanisms:aluminum_steel_ingot>]
]);
craftingTable.addShaped("rftoolsbase.machine_base/skyblock", <item:rftoolsbase:machine_base>, [
    [<tag:items:forge:ingots/steel>, <item:rftoolsbase:dimensionalshard>, <tag:items:forge:ingots/steel>],
    [<item:minecraft:iron_block>, <item:minecraft:gold_block>, <item:minecraft:iron_block>]
]);

//Quantum Quarry Plus
craftingTable.removeByName("crafttweaker:qqprcp");
craftingTable.addShaped("quantumquarryplus.qqprcp/skyblock", <item:quantumquarryplus:quantum_quarry_plus:> , [
	[<item:quantumquarryplus:quarry_framw>, <item:minecraft:bucket>, <item:quantumquarryplus:quarry_framw>], 
	[<item:minecraft:netherite_pickaxe>.withTag({Damage: 0 as int}), <item:silentgear:azure_electrum_ingot>, <item:minecraft:netherite_pickaxe>.withTag({Damage: 0 as int})], 
	[<item:quantumquarryplus:quarry_framw>, <item:quantumquarryplus:endercell>, <item:quantumquarryplus:quarry_framw>]
]);

//Mystical Agriculture
craftingTable.removeByName("crafttweaker:infusion_padestal");
craftingTable.removeByName("crafttweaker:infusion_altar");
craftingTable.addShaped("mysticalagriculture.infusion_pedestal/skyblock", <item:mysticalagriculture:infusion_pedestal>, [
	[<item:minecraft:air>, <tag:items:forge:ingots/draconium>, <item:minecraft:air>], 
	[<item:minecraft:red_carpet>, <item:minecraft:stone>, <item:minecraft:red_carpet>], 
	[<item:minecraft:air>, <item:minecraft:stone>, <item:minecraft:air>]
]);
craftingTable.addShaped("mysticalagriculture.infusion_altar/skyblock", <item:mysticalagriculture:infusion_altar>, [
	[<tag:items:forge:ingots/draconium>, <item:minecraft:red_carpet>, <tag:items:forge:ingots/draconium>], 
	[<item:minecraft:red_carpet>, <item:minecraft:stone>, <item:minecraft:red_carpet>], 
	[<item:minecraft:stone>, <item:minecraft:stone>, <item:minecraft:stone>]
]);

//Enviromental Tech
craftingTable.removeRecipe(<item:envirotech:litherite_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:erodium_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:kyronite_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:pladium_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:ionite_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:aethium_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:nanorite_void_miner_ccu>);
craftingTable.removeRecipe(<item:envirotech:xerothium_void_miner_ccu>);
craftingTable.addShaped("envirotech.litherite_void_miner_ccu/skyblock", <item:envirotech:litherite_void_miner_ccu>, [
	[<item:cyclic:miner>, <item:silents_mechanisms:compressed_iron_ingot>, <item:cyclic:miner>], 
	[<item:envirocore:litherite>, <item:envirocore:laser_diode>, <item:envirocore:litherite>], 
	[<tag:items:envirocore:structure/panels>, <item:envirocore:laser_core>, <tag:items:envirocore:structure/panels>]
]);
craftingTable.addShaped("envirotech.erodium_void_miner_ccu/skyblock", <item:envirotech:erodium_void_miner_ccu>, [
	[<tag:items:forge:plastic>, <item:envirotech:litherite_void_miner_ccu>, <tag:items:forge:plastic>], 
	[<item:envirocore:erodium>, <item:envirocore:laser_core>, <item:envirocore:erodium>], 
	[<item:envirocore:cpu>, <item:envirotech:litherite_void_miner_ccu>, <item:envirocore:cpu>]
]);
craftingTable.addShaped("envirotech.kyronite_void_miner_ccu/skyblock", <item:envirotech:kyronite_void_miner_ccu>, [
	[<item:tconstruct:slimesteel_ingot>, <item:envirotech:erodium_void_miner_ccu>, <item:tconstruct:slimesteel_ingot>], 
	[<item:envirocore:kyronite>, <item:immersiveengineering:pickaxe_steel>.withTag({Damage: 0 as int}), <item:envirocore:kyronite>], 
	[<item:envirocore:laser_core>, <item:envirotech:erodium_void_miner_ccu>, <item:envirocore:laser_core>]
]);
craftingTable.addShaped("envirotech.pladium_void_miner_ccu/skyblock", <item:envirotech:pladium_void_miner_ccu>, [
	[<item:tconstruct:queens_slime_ingot>, <item:envirotech:kyronite_void_miner_ccu>, <item:tconstruct:queens_slime_ingot>], 
	[<item:envirocore:pladium>, <item:envirocore:laser_core>, <item:envirocore:pladium>], 
	[<item:envirocore:frequency_modifier>, <item:envirotech:kyronite_void_miner_ccu>, <item:envirocore:frequency_modifier>]
]);
craftingTable.addShaped("envirotech.ionite_void_miner_ccu/skyblock", <item:envirotech:ionite_void_miner_ccu>, [
	[<item:industrialforegoing:pink_slime_ingot>, <item:envirotech:pladium_void_miner_ccu>, <item:industrialforegoing:pink_slime_ingot>], 
	[<item:envirocore:ionite>, <item:rftoolsbuilder:builder>, <item:envirocore:ionite>], 
	[<item:envirocore:amplification_modifier>, <item:envirotech:pladium_void_miner_ccu>, <item:envirocore:amplification_modifier>]
]);
craftingTable.addShaped("envirotech.aethium_void_miner_ccu/skyblock", <item:envirotech:aethium_void_miner_ccu>, [
	[<item:industrialforegoing:processing_addon_2>.withTag({TitaniumAugment: {Processing: 3.0 as float}}), <item:envirotech:ionite_void_miner_ccu>, <item:industrialforegoing:processing_addon_2>.withTag({TitaniumAugment: {Processing: 3.0 as float}})], 
	[<item:envirocore:aethium>, <item:envirocore:laser_core>, <item:envirocore:aethium>], 
	[<item:envirocore:bandwidth_modifier>, <item:envirotech:ionite_void_miner_ccu>, <item:envirocore:bandwidth_modifier>]
]);
craftingTable.addShaped("envirotech.nanorite_void_miner_ccu/skyblock", <item:envirotech:nanorite_void_miner_ccu>, [
	[<item:mekanism:alloy_infused>, <item:envirotech:aethium_void_miner_ccu>, <item:mekanism:alloy_infused>], 
	[<item:envirocore:nanorite>, <item:mekanism:digital_miner>, <item:envirocore:nanorite>], 
	[<item:envirocore:dimensional_modifier>, <item:envirotech:aethium_void_miner_ccu>, <item:envirocore:dimensional_modifier>]
]);
craftingTable.addShaped("envirotech.xerothium_void_miner_ccu/skyblock", <item:envirotech:xerothium_void_miner_ccu>, [
	[<item:mekanism:block_refined_obsidian>, <item:envirotech:nanorite_void_miner_ccu>, <item:mekanism:block_refined_obsidian>], 
	[<item:envirocore:xerothium>, <item:envirocore:laser_core>, <item:envirocore:xerothium>], 
	[<item:envirocore:interdimensional_modifier>, <item:envirotech:nanorite_void_miner_ccu>, <item:envirocore:interdimensional_modifier>]
]);

mods.jei.JEI.addInfo(<item:naturesaura:nature_altar>, ["Don't build the crimson altar it will not work anywhere apart from the nether which you cannot get to. All the crimson altar recipeshave been ported to the natural altar"]);
mods.jei.JEI.addInfo(<item:minecraft:dirt>, [
  "This is a list of everything that dirt drops when being sieved with a string mesh or higher:",
  "Wheat Seeds, 0.2",
  "Melon Seeds, 0.05",
  "Pumpkin Seeds, 0.05",
  "Beetroot Seeds, 0.03",
  "Vines, 0.03",
  "Cocoa Beans, 0.04",
  "Sweet Berry Seeds, 0.04",
  "Carrot Seeds, 0.05",
  "Fern Seed, 0.01",
  "Cactus Seed, 0.04",
  "Grass Seeds, 0.03",
  "Potato Seeds, 0.05",
  "Sugarcane Seeds, 0.04",
  "Bamboo Seed, 0.03",
  "Large Fern Seed, 0.01",
  "Ancient Spores, 0.05",
  "Oak Seed, 0.03",
  "Dark Oak Seed, 0.03",
  "Birch Seed, 0.03",
  "Spruce Seed, 0.03",
  "Acacia Seed, 0.03",
  "Jungle Seed, 0.03",
  "Blackstone Pebble, 0.9",
  "Basalt pebble, 0.9",
  "Granite Pebble, 0.9",
  "Diorite Pebble, 0.9",
  "Andesite Pebble, 0.9",
  "Stone Pebble, 0.9, 0.6, 0.3"]);