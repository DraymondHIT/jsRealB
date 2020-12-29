var graphe={};
var etats =[
    // haut gauche   [p 908 bas]
    new Etape("Réfléchir, Se décider",127,17,
              ()=>S(CP(C("et"), 
                    SP(protagoniste.struct(),VP(V("réfléchir").t(t),Adv("mûrement"))), 
                    SP(protagoniste.struct(),VP(V("prendre").t(t),NP(poss(),N("décision"))))
                    )),
              "Aller chez Mr X"),
    new Etape("Aller chez Mr X",351,17,
              ()=>allezChez(chef,demanderAugment),
              "Est-il dans son bureau ?"),
    new Test( "Est-il dans son bureau ?",342,48,
              ()=>S(chefPro(),
                    VP(V("être").t(t),
                       PP(P("dans"),
                          NP(D("mon").pe(3),N("bureau"))))),
              "Frapper","Guetter son retour dans le couloir",false,"h-150","h20"),
    new Etape("Frapper",135,65,
               () => S(protagoniste.struct(),VP(V("frapper").t(t))),
              "Lève-t-il la tête ?"),
    new Test( "Lève-t-il la tête ?",127,100,
               () => S(chefPro(),
                       VP(V("lever").t(t),
                          NP(D("le"),N("tête")))),
              "Signe de tête affirmatif ?","Réfléchir, Se décider",true),
    new Test( "Signe de tête affirmatif ?",205,158,
               () => S(chefPro(),
                       VP(V("faire").t(t),
                          NP(D("un"),N("signe"),
                             PP(P("de"),N("tête"))),A("affirmatif"))),
              "ENTRER","Vous dit-on de revenir à 14h30 ?",true),
    new Test( "Vous dit-on de revenir à 14h30 ?",79,238,
              ()=>S(chefPro(),
                    VP(protagoniste.struct().c("dat"),
                       V("dire").t(t),
                       PP(P("de"),V("revenir").t("b"),
                          PP(P("à"),Q("14h30"))))),
              "Retourner à votre place.","Réfléchir, Se décider",true),
    new Etape("Retourner à votre place.",170,289,
              ()=>S(protagoniste.struct(),
                    VP(V("retourner").t(t),
                       PP(P("à"),NP(poss(),N("place"))))),
              "Est-ce VENDREDI ?"),
    new Test( "Est-ce VENDREDI ?",170,320,
              ()=>cEst("vendredi"),
              "Se renseigner sur/le menu du Snack","Est-ce le CARÊME ?",true),
    new Test( "Est-ce le CARÊME ?",79,377,
              ()=>cEst("carême"),
              "Se renseigner sur/le menu du Snack","Est-ce LUNDI ?",true,undefined,"h 40 v 10"),
    new Etape("Se renseigner sur/le menu du Snack",246,416,
              ()=>S(protagoniste.struct(),
                    protagoniste.struct().c("acc"),
                    VP(V("renseigner").t(t),
                       PP(P("sur"),
                          NP(D("le"),N("menu"),
                             PP(P("de"),NP(D("le"),N("snack"))))))),
              "Y avait-il du Poisson ?","v 10"),
    new Test( "Est-ce LUNDI ?",82,447,
              ()=>cEst("lundi"),
              "ATTENDRE LE LENDEMAIN","ATTENDRE/14H30",true),
    // bas gauche [p 909 bas]
    new Test( "Y avait-il du Poisson ?",198,464,
              ()=>S(Pro("lui").c("nom"),Pro("y"),
                    VP(V("avoir").t("i"),
                       PP(P("de"),NP(D("le"),N("poisson"))))),
              "A-t-il avalé/une arête ?","des Œufs?",true),
    new Etape("ATTENDRE/14H30",79,557,
              ()=>S(protagoniste.struct(),
                    VP(V("attendre").t(t),Q("14h30"))),
              "Réfléchir, Se décider"),
    new Test( "des Œufs?",188,541,
              ()=>S(Pro("lui").c("nom"),Pro("y"),
                    VP(V("avoir").t("i"),
                       PP(P("de"),NP(D("le"),N("oeuf").n("p"))))),
              "Étaient-ils pourris ?","ATTENDRE/14H30",true,"h-20"),
    new Test( "Étaient-ils pourris ?",170,609,
               ()=>S(NP(D("le"),N("oeuf").n("p")),
                        VP(V("pourrir").t("pq").aux("êt"))),
              "ATTENDRE LE LENDEMAIN","ATTENDRE/14H30",true,"h -30 v -40"),
    new Test( "A-t-il avalé/une arête ?",291,541,
              ()=>S(chefPro(),
                    VP(V("avaler").t("pc"),
                       NP(D("un"),N("arête")))),      
              "ATTENDRE LE LENDEMAIN","ATTENDRE/14H30",true,"h -130","m -20 10 v 20 h -30 v 48 h -25"),
    new Etape("ATTENDRE LE LENDEMAIN",82,665,
              ()=>S(protagoniste.struct(),
                    VP(V("attendre").t(t),
                       NP(D("le"),N("lendemain")))),
              "Réfléchir, Se décider"),
    new Test( "Est-ce une/question T60 ?",337,626,
              ()=>cEst(NP(D("un"),N("question"),Q("T60"))),
              "Voir une autre Section","Est-ce une autre Etude",true),
    new Test( "Est-ce une autre Etude",232,697,
              ()=>cEst(NP(D("un"),A("autre"),N("étude"))),
              "S'y intéresse-t-il ?","Est-ce une question d'AUGMENTATION ?",true,undefined,"h 5 v 30"),
    new Test( "Est-ce une question d'AUGMENTATION ?",85,746,
               ()=>cEst(NP(D("un"),N("question"),PP(P("de"),N("augmentation")))),
              "Avez-vous participé récemment/à une grosse étude réussie",
              "Retournez à votre place",false,undefined,"m -10 10 v 50 h 25 v 100 h 90 v 45"),
    new Test( "S'y intéresse-t-il ?",375,760,
              ()=>S(chefPro(),
                     VP(chefPro().c("refl"),Pro("y"),V("intéresser").t(t))),
              "Juge-t-il votre question intelligente ?","CORBEILLE",true),
    new Test( "Avez-vous participé récemment/à une grosse étude réussie",87,796,
               ()=>S(protagoniste.struct(),
                     VP(V("participer").t("pc"),Adv("récemment"),
                        PP(P("à"),
                           NP(D("un"),A("gros"),N("étude"),A("réussi"))))),
              "INSISTEZ SUR CE QUE VOUS DÉSIREZ","Etes-vous bien avec l'ingénieur",false),
    new Test( "Etes-vous bien avec l'ingénieur",167,863,
              ()=>S(protagoniste.struct(),
                    VP(V("être").t(t),Adv("bien"),
                       PP(P("avec"),NP(D("le"),N("ingénieur"))))),
              "INSISTEZ SUR CE QUE VOUS DÉSIREZ","Retournez à votre place",
              false,undefined,"h 110 v95"),
    new Etape("INSISTEZ SUR CE QUE VOUS DÉSIREZ",82,913,
              ()=>S(V("insister").t("ip").pe(protagoniste.pe).n(protagoniste.n),
                    PP(P("sur"),
                       Pro("ce").g("m").n("s").pe(3),
                       SP(Pro("que"),protagoniste.struct(),VP(V("vouloir"))))),
              "L'obtenez-vous ?","m -100 0 v 25"),
    new Test( "L'obtenez-vous ?",85,955,
               ()=>S(protagoniste.struct(),
                     VP(Pro("le").g("f"),V("obtenir").t(t))),
              "Vous donne-t-on des espérances","Vous donne-t-on des espérances",false,"h-13","h 15"),
    new Test( "Vous donne-t-on des espérances",207,970,
               ()=>S(Pro("on"),protagoniste.struct().c("dat"),
                     VP(V("donner").t(t),
                        NP(D("un"),N("espérance").n("p")))),
              "  ATTENDEZ SIX MOIS  ","  ATTENDEZ SIX MOIS  ",false),
    new Etape("  ATTENDEZ SIX MOIS  ",225,1026,
              ()=>S(V("attendre").t("ip").pe(protagoniste.pe).n(protagoniste.n),
                    NP(NO(6).dOpt({nat:true}),N("mois"))),
              "Réfléchir, Se décider"),
        // haut droit   [p 908 haut]
    new Etape("Se décider, Réfléchir",580,17,
            ()=>S(CP(C("et"), 
                  SP(protagoniste.struct(),VP(V("prendre").t(t),NP(poss(),N("décision")))),
                  SP(protagoniste.struct(),VP(V("réfléchir").t(t),Adv("mûrement"))), 
                )),
              "Aller chez Mr X"),
    new Etape("Guetter son retour dans le couloir",518,65,
              () => S(protagoniste.struct(),
                      VP(V("guetter").t(t)),
                         NP(D("mon"),N("retour"),
                            PP(P("dans"),NP(D("le"),N("couloir"))))),
              "Mlle Y est-elle dans son bureau ?"),
    new Test( "Mlle Y est-elle dans son bureau ?",524,100,
              ()=>S(collegue.struct(),
                    VP(V("être").t(t),
                       PP(P("dans"),
                          NP(D("mon").pe(3),N("bureau"))))),
              "Est-elle de bonne humeur ?","Faire le tour du labo  ",false),
    new Test( "Est-elle de bonne humeur ?",445,158,
              ()=>S(Pro("elle"),
                    VP(V("être").t(t),
                       PP(P("de"),NP(A("bon"),N("humeur"))))),
              "Bavarder avec Mlle Y","Faire le tour du labo  "),
    new Etape("Faire le tour du labo  ",590,205,
              ()=>S(protagoniste.struct(),
                    VP(V("faire").t(t),
                       NP(D("le"),N("tour"),
                          PP(P("de"),NP(D("le"),A("différent").pos("pre"),N("service").n("p")),
                             SP(Pro("dont"),NP(D("le"),N("ensemble")),
                                VP(V("constituer"),
                                   CP(C("ou"),N("tout"),N("partie")),
                                   PP(P("de"),
                                      NP(D("le"),N("organisation")),
                                         SP(Pro("qui"),
                                            Pro("moi").g(protagoniste.g).n(protagoniste.n)
                                                      .pe(protagoniste.pe).c("acc"),
                                            V("employer"))))))).a(","),
                       PP(P("en"),V("attendre").t("pr"),
                          NP(D("un"),N("moment"),A("propice").f("co"),
                             PP(P("pour"),allerVoir(chef,"b")))))),
              "Se décider, Réfléchir","m 70 -10 h 105"),
    new Etape("Bavarder avec Mlle Y",430,205,
              () => S(protagoniste.struct(),
                      VP(V("pouvoir").t(t),V("bavarder").t("b"),
                         PP(NP(D("un"),N("instant")),
                            P("avec"),Pro("elle"))),
                         PP(P("en"),V("attendre").t("pr"),
                            SP(Pro("que"),chef.struct(),V("revenir").t("s")))),
              "Aperçoit-on Mr X ?"),
    new Test( "Aperçoit-on Mr X ?",436,240,
              ()=>S(Pro("on"),
                    VP(V("apercevoir").t(t),chefNom())),
              "Trouver un prétexte pour sortir","Bavarder avec Mlle Y",false,undefined,"h 20 v -45 h -15"),
    new Etape("Trouver un prétexte pour sortir",436,289,
              ()=>S(protagoniste.struct(),
                    VP(V("trouver").t(t),
                    NP(D("un"),N("prétexte"),P("pour"),V("sortir").t("b")))),
              "Se décider, Réfléchir"),
    new Etape("ENTRER",345,257,
              ()=>S(protagoniste.struct(),
                    VP(V("entrer").t(t))),
              "Vous offre-t-il un siège ?"),
    new Test( "Vous offre-t-il un siège ?",351,323,
              ()=>S(chefPro(),
                    protagoniste.struct().c("dat"),
                    VP(V("offrir").t(t),NP(D("un"),N("siège")))),
              "DECONTRACTEZ-VOUS","Demander si une fille a la rougeole",false),
    new Etape("DECONTRACTEZ-VOUS",351,377,
              ()=>S(VP(V("décontracter").t("ip").pe(protagoniste.pe).n(protagoniste.n).lier(),
                       protagoniste.structTn())),
              "EXPOSER VOTRE/PROBLEME"),
    new Test( "Demander si une fille a la rougeole",550,323,
              ()=>S(NP(D("un"),N("fille")),
                     VP(V("avoir").t(t)),
                        NP(D("le"),N("rougeole"))),
              "A-t-il des boutons rouges/sur la figure ?","Si deux filles ont la rougeole",false),
    new Test( "A-t-il des boutons rouges/sur la figure ?",454,419,
              ()=>S(chefPro(),
                    VP(V("avoir").t(t),
                       NP(D("un"),N("bouton").n("p"),
                          PP(P("sur"),NP(D("le"),N("figure")))))),
              "ENFERMEZ Mr X PENDANT 40 JOURS","DECONTRACTEZ-VOUS",true,"h-10 v -63","m-30 0 h-83 v 180"),
    new Test( "Si deux filles ont la rougeole",630,419,
              ()=>S(NP(NO(2).nat(true),N("fille")),
                    VP(V("avoir").t(t),
                       NP(D("le"),N("rougeole")))),
              "Sortir sous un/faux prétexte","Si trois filles ont la rougeole",false,"h -60 v 40"),
    new Etape("Sortir sous un/faux prétexte",515,487,
              ()=>S(protagoniste.struct(),
                       VP(V("sortir").t(t),
                          PP(P("sous"),
                             NP(D("un"),A("faux"),N("prétexte"))))),
              "Alarme 2e urgence","v 25"),
    new Test( "Si trois filles ont la rougeole",630,467,
               ()=>S(NP(NO(3).nat(true),N("fille")),
                      VP(V("avoir").t(t),
                         NP(D("le"),N("rougeole")))),
              "Sortir précipitamment","Si la 4e couve"),
    new Etape("EXPOSER VOTRE/PROBLEME",355,490,
              ()=>S(protagoniste.struct(),
                        VP(V("exposer").t(t),
                           NP(poss(),N("problème")))),
              "Est-ce une/question T60 ?","m -20 0 v 95"),
        // bas droit [p 909 haut]
    new Etape("Alarme 1re urgence",590,550,
              ()=>S(Pro("ce"),
                    VP(V("être").t(t),
                       NP(D("un"),N("alarme"),
                          PP(P("de"),
                             NP(NO(1).dOpt({ord:true}),N("urgence")))))),
              "ENFERMEZ Mr X PENDANT 40 JOURS"),
    new Etape("Alarme 2e urgence",453,550,
              ()=>S(Pro("ce"),
                    VP(V("être").t(t),
                       NP(D("un"),N("alarme"),
                          PP(P("de"),
                             NP(NO(2).dOpt({ord:true}),N("urgence")))))),
              "ENFERMEZ Mr X PENDANT 40 JOURS","m 20 0 v 80"),
    new Etape("Sortir précipitamment",603,520,
              ()=>S(protagoniste.struct(),
                    VP(V("sortir").t(t),Adv("précipitamment"))),
              "Alarme 1re urgence","v 15"),
    new Test( "Si la 4e couve",725,565,
              ()=>S(D("le").g("f"),NO(4).dOpt({ord:true}),
                     VP(V("couver").t(t))),
              "Attendez/40 jours","N'insistez pas",true),
    new Etape("Attendez/40 jours",770,616,
              ()=>S(protagoniste.struct(),
                    VP(V("attendre").t(t),
                       NP(NO(40).dOpt({nat:true}),N("jour")))),
              "Se décider, Réfléchir"),
    new Etape("N'insistez pas",657,620,
              ()=>S(protagoniste.struct(),
                    VP(V("insister").t(t))).typ({neg:true}),
              "EXPOSER VOTRE/PROBLEME","m -42 -10 h -245 v -85"),
    new Etape("ENFERMEZ Mr X PENDANT 40 JOURS",470,660,
              ()=>S(protagoniste.struct(),
                    VP(V("enfermer").t(t),chefNom(),
                       PP(P("pendant"),
                          NP(NO(40),N("jour"))))),
              "Se décider, Réfléchir"),
    new Etape("Voir une autre Section",394,705,
              ()=>S(protagoniste.struct(),
                    VP(V("aller").t(t),V("voir").t("b"),
                       NP(D("un"),A("autre"),N("section")))),
              "Errer de Section en Section"),
    new Etape("Errer de Section en Section",555,705,
              ()=>S(protagoniste.struct(),
                    VP(V("errer").t(t),
                       PP(P("de"),N("section"),P("en"),N("section")))),
              "Se décider, Réfléchir"),
    new Test( "Juge-t-il votre question intelligente ?",510,765,
               ()=>S(chefPro(),
                     VP(V("juger").t(t),
                        NP(poss(),N("question"),A("intelligent")))),
              "A-t-il le temps d'y répondre ?","CORBEILLE",true,"m 10 10 v 25 h -45"),
    new Test( "A-t-il le temps d'y répondre ?",560,820,
               ()=>S(chefPro(),
                     VP(V("avoir").t(t),
                        NP(D("le"),N("temps"),
                           PP(P("de"),Pro("y"),V("répondre").t("b"))))),
              "A-t-il vraiment compris ?","CORBEILLE",true,undefined,"h 5 v 30 h -15"),
    new Test( "A-t-il vraiment compris ?",572,871,
              ()=>S(chefPro(),
                    VP(V("comprendre").t("pc"),Adv("vraiment"))),
              "Vous félicite-t-il ?","Envoyez Mr X au TV1"),
    new Test( "Vous félicite-t-il ?",490,927,
              ()=>S(chefPro(),
                    VP(protagoniste.struct().c("acc"),V("féliciter").t(t))),
              "Retournez à votre place","Retournez à votre place"),
    new Etape("Envoyez Mr X au TV1",623,935,
              ()=>S(protagoniste.struct(),
                    VP(V("envoyer").t(t),chefNom(),
                       PP(P("à"),D("le"),Q("TV1")))),
              "lui laisser le temps d'assimiler"),
    new Etape("Retournez à votre place",454,994,
              ()=>S(protagoniste.struct(),
                    VP(V("retourner").t(t),
                       PP(P("à"),poss(),N("place")))),
              "Réfléchissez au prochain problème","v 10"),
    new Etape("lui laisser le temps d'assimiler",620,975,
              ()=>S(protagoniste.struct(),
                    chefPro().c("dat"),
                    VP(V("laisser").t(t),
                       NP(D("le"),N("temps"),P("de"),V("assimiler").t("b")))),
              "Se décider, Réfléchir"),
    new Etape("Réfléchissez au prochain problème",475,1026,
              ()=>S(protagoniste.struct(),
                    VP(V("réfléchir").t(t),
                       PP(P("à"),
                          NP(D("le"),A("prochain").pos("pre"),N("problème"))))),
              "Se décider, Réfléchir"),
    new Etape("CORBEILLE",385,830,
              ()=>S(NP(poss(),N("demande")),
                    VP(V("aller").t(t),
                        PP(P("à"),NP(D("le"),N("panier"))))),
              undefined,undefined),// étape finale...
];

etatInitial=graphe["Réfléchir, Se décider"];
etatFinal=graphe["Aller chez Mr X"];

function valideGraphe(){
    function check(depart,arrivee){
        if (!(arrivee in graphe))
            console.log("%s absent: depart %s",arrivee, depart)
    }
    for (const i in etats) {
        const depart=etats[i].nom;
        const etatDepart=graphe[depart];
        // console.log(depart);
        if (etatDepart instanceof Etape) 
            check(depart,etatDepart.suivant);
        else if (etatDepart instanceof Test) {
            check(depart,etatDepart.alternativeOUI);
            check(depart,etatDepart.alternativeNON);
        } else {
            console.log("etat inconnu:%s::%s",depart, typeof depart)
        }
    }
}

valideGraphe();

// fonctions auxiliaires pour le tracé de l'organigramme

const OUIwidth=29, NONwidth=35; // à ajuster en fonction de la police...
const OUIheight=19,NONheight=19;

function fleche(d){
    // add arrow
    return svg.append("path")
              .attr("d",d)
              .attr("fill","none")
              .attr("stroke","black")
              .attr("stroke-width","1")
              .attr("marker-end","url(#arrow)");    
}

const m = (x,y)=>` M ${x} ${y}`;
const l = (x,y)=>` L ${x} ${y}`;
const eq = (v1,v2) => Math.abs(v1-v2)<10 ; // à peu près égal...
var minX,maxX;

// tracer une flèche entre deux bbox
function tracer(d_bbox,a_bbox, direction){
    // direction: h(aut), b(as), 
    //            g(auche), d(roite), si arrivee est undefined aller vers les côtés
    let dx=d_bbox.x;
    let dy=d_bbox.y;
    let dw=d_bbox.width;
    let dh=d_bbox.height;
    switch (direction) {
    case "h":
        return fleche(m(dx+dw/2,dy)+l(dx,a_bbox.y+a_bbox.height));
        break;
    case "b":
        return fleche(m(dx+dw/2,dy+dh)+l(dx+dw/2,a_bbox.y));
        break;
    case "g":
        dy+=dh/2;
        if (a_bbox==undefined){
            return fleche(m(dx,dy)+l(minX,dy))
        } else {
            return fleche(m(dx,dy)+l(a_bbox.x+a_bbox.width,dy))
        }
        break;
    case "d":
        dy+=dh/2
        if (a_bbox==undefined){
            return fleche(m(dx+dw,dy)+l(maxX,dy))
        } else {
            return fleche(m(dx+dw,dy)+l(a_bbox.x,dy));
        }
        break;
    default:
        console.log("direction inconnue:"+direction)
    }
}

function organigramme(){
    svg=d3.select("svg");
    const bcr=svg.node().getBoundingClientRect();
    width=bcr.width;
    height=bcr.height;
    // attention à ne pas changer pour éviter d'avoir à tout recalculer les positions 
    const x_extent=[79,825];  
    const y_extent=[17,1026];
    margin=20;
    x_scale = d3.scaleLinear().range([margin,-margin+width]).domain(x_extent);
    y_scale = d3.scaleLinear().range([margin,-margin+height]).domain(y_extent);
    
    // placer tous les états0
    svg.selectAll("g")
        .data(etats)
        .enter()
        .each(function(etat){
            etat.afficher(x_scale(etat.x),y_scale(etat.y));
        })
            
    // grande flèche à gauche
    minX=10;
    const rsd=graphe["Réfléchir, Se décider"];
    const minY=rsd.bbox.y+rsd.bbox.height/2;
    const a6m=graphe["  ATTENDEZ SIX MOIS  "];
    const maxY = a6m.bbox.y+a6m.bbox.height/2;
    fleche(m(a6m.bbox.x,maxY)+l(minX,maxY)+l(minX,minY)+l(rsd.bbox.x,minY));
    
    // grande flèche droite
    maxX=width-10;
    const sdr=graphe["Se décider, Réfléchir"];
    const rpp=graphe["Réfléchissez au prochain problème"];
    fleche(m(rpp.bbox.x+rpp.bbox.width,maxY)+l(maxX,maxY)+l(maxX,minY)+
           l(sdr.bbox.x+sdr.bbox.width,minY));
    
    etats.forEach(function(etat){etat.lier()});
}    

