alert( 'Engine.js' );

UNIT_SCV = 'scv';
UNIT_Marine = 'marine';
UNIT_Marauder = 'marauder';
UNIT_Reaper = 'reaper';
UNIT_Ghost = 'ghost';
UNIT_Hellion = 'hellion';
UNIT_SiegeTank = 'siege_tank';
UNIT_Thor = 'thor';
UNIT_Viking = 'viking';
UNIT_Medivac = 'medivac';
UNIT_Raven = 'raven';
UNIT_Banshee = 'banshee';
UNIT_Battlecruiser = 'battlecruiser';

UNIT_Probe = 'probe';
UNIT_Zealot = 'zealot';
UNIT_Stalker = 'stalker';
UNIT_Sentry = 'sentry';
UNIT_Observer = 'observer';
UNIT_Immortal = 'immortal';
UNIT_WarpPrism = 'warp_prism';
UNIT_Colossus = 'colossus';
UNIT_Phoenix = 'phoenix';
UNIT_VoidRay = 'void_ray';
UNIT_HighTemplar = 'high_templar';
UNIT_DarkTemplar = 'dark_templar';
UNIT_Archon = 'archon';
UNIT_Carrier = 'carrier';
UNIT_Mothership = 'mothership';

UNIT_Drone = 'drone';
UNIT_Zergling = 'zergling';
UNIT_Queen = 'queen';
UNIT_Hydralisk = 'hydralisk';
UNIT_Baneling = 'baneling';
UNIT_Overseer = 'overseer';
UNIT_Roach = 'roach';
UNIT_Infestor = 'infestor';
UNIT_Mutalisk = 'mutalisk';
UNIT_Corruptor = 'corruptor';
UNIT_NydusWorm = 'nydus_worm';
UNIT_Ultralisk = 'ultralisk';
UNIT_BroodLord = 'brood_lord';

UNIT_CommandCenter = 'command_center';
UNIT_OrbitalCommand = 'orbital_command';
UNIT_PlanetaryFortress = 'plantary_fortress';
UNIT_SupplyDepot = 'supply_depot';
UNIT_Refinery = 'refinery';
UNIT_Barracks = 'barracks';
UNIT_EngineeringBay = 'engineering_bay';
UNIT_Bunker = 'bunker';
UNIT_MissileTurret = 'missile_turret';
UNIT_SensorTower = 'sensor_tower';
UNIT_Factory = 'factory';
UNIT_GhostAcademy = 'ghost_academy';
UNIT_Armory = 'armory';
UNIT_Starport = 'starport';
UNIT_FusionCore = 'fusion_core';
UNIT_TechLab = 'tech_lab';
UNIT_Reactor = 'reactor';

UNIT_Hatchery = 'hatchery';
UNIT_Overlord = 'overlord';
UNIT_Extractor = 'extractor';
UNIT_SpawningPool = 'spawning_pool';
UNIT_EvolutionChamber = 'evolution_chamber';
UNIT_SpineCrawler = 'spine_crawler';
UNIT_SporeCrawler = 'spore_crawler';
UNIT_RoachWarren = 'roach_warren';
UNIT_BanelingNest = 'baneling_nest';
UNIT_Lair = 'lair';
UNIT_HydraliskDen = 'hydralisk_den';
UNIT_InfestationPit = 'infestation_pit';
UNIT_Spire = 'spire';
UNIT_NydusNetwork = 'nydus_network';
UNIT_Hive = 'hive';
UNIT_UltraliskCavern = 'ultralisk_cavern';
UNIT_GreaterSpire = 'greater_spire';

UNIT_Nexus = 'nexus';
UNIT_Pylon = 'pylon';
UNIT_Assimilator = 'assimilator';
UNIT_Gateway = 'gateway';
UNIT_Forge = 'forge';
UNIT_PhotonCannon = 'photon_cannon';
UNIT_Warpgate = 'warpgate';
UNIT_CyberneticsCore = 'cybernetics_core';
UNIT_TwilightCouncil = 'twilight_council';
UNIT_RoboticsFacility = 'robotics_facility';
UNIT_Stargate = 'stargate';
UNIT_TemplarArchives = 'templar_archives';
UNIT_DarkShrine = 'dark_shrine';
UNIT_RoboticsBay = 'robotics_bay';
UNIT_FleetBeacon = 'fleet_beacon';

R = NewResource();
globalTime = 0;
globalMins = 0;
globalGas = 0;
globalSupply = 0;
maxSupply = 10;
globalList = new array();
lastItem = null;

function addItem( item )
{
    alert( 'addItem' );

    if ( validateItem( item ) )
    {
        item.startTime = globalTime;
        globalTime += item.buildtime;
        globalMins -= item.mineral;
        globalGas -= item.vespene;
        globalSupply += item.supply;

        if ( lastItem == null )
        {
            item.previousItem = null;
        }
        else
        {
            item.previousItem = lastItem;
            lastItem.nextItem = item;
        }

        item.nextItem = null;
        lastItem = item;
        globalList.push( item );
    }
}

function removeItem( item )
{
    alert( 'removeItem' );

    globalTime += item.buildtime;
    globalMins += item.mineral;
    globalGas += item.vespene;
    globalSupply -= item.supply;

    item.previousItem.nextItem = item.nextItem;
    item.nextItem.previousItem = item.previousItem;
}

function removeLastItem()
{
    alert( 'removeLastItem' );

    globalTime -= item.buildtime;
    globalMins += item.mineral;
    globalGas += item.vespene;

    if ( lastItem != null )
    {
        lastItem = lastItem.previousItem;

        if ( lastItem != null )
        {
            lastItem.nextItem = null;
        }
    }
}

function validateItem( item )
{
    if ( item.supply > ( maxSupply - globalSupply ) )
    {
        return false;
    }

    Prerequisites :

    for ( p in item.prerequisites )
    {
        for ( i in globalList )
        {
            if ( globalList[i].class == item.prerequisites[p] )
            {
                continue Prerequisites;
            }
        }

        return false;
    }

    while ( ( globalMins < item.minerals ) || ( globalGas < item.vespene ) )
    {
        ++globalTime;
        globalMins = getMin( globalTime );
        globalGas = getGas( globalTime );
    }

    return true;
}
