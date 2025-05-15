
import coffe from "/filterPage/coffe.webp"
import BowlWithSpoon from "/filterPage/BowlWithSpoon.webp"
import Chestnut from "/filterPage/Chestnut.webp"
import Cupcake from "/filterPage/Cupcake.webp"
import ShallowPan from "/filterPage/ShallowPan.webp"
import GreenSalad from "/filterPage/GreenSalad.webp"
import PotOfFood from "/filterPage/PotOfFood.webp"

import Bread from "/composants/Bread.webp"
import Broccoli from "/composants/Broccoli.webp"
import CutOfMeat from "/composants/CutOfMeat.webp"
import TropicalFish from "/composants/TropicalFish.webp"

import OkHand from "/preparation/OkHand.webp"
import Toolbox from "/preparation/Toolbox.webp"
import PinchingHand from "/preparation/PinchingHand.webp"
import Salad from "/preparation/GreenSalad.webp"
import Stopwatch from "/preparation/Stopwatch.webp"
import Pie from "/preparation/Pie.webp"

import CheeseWedge from "/nutrition/CheeseWedge.webp"
import Cooking from "/nutrition/Cooking.webp"
import Eggplant from "/nutrition/Eggplant.webp"
import Fish from "/nutrition/Fish.webp"
import GreenApple from "/nutrition/GreenApple.webp"
import LeafyGreen from "/nutrition/LeafyGreen.webp"
import Peanuts from "/nutrition/Peanuts.webp"
import PoultryLeg from "/nutrition/PoultryLeg.webp"
import sansSucre from "/nutrition/sansSucre.webp"
import sansLactose from "/nutrition/sansLactose.webp"
import sansGluten from "/nutrition/sansGluten.webp"
import Shamrock from "/nutrition/Shamrock.webp"
import Teacup from "/nutrition/Teacup.webp"


import img1 from "/kcal/Cherries.webp"
import img2 from "/kcal/Watermelon.webp"
import img3 from "/kcal/Sandwich.webp"
import img4 from "/kcal/Bagel.webp"
import img5 from "/kcal/Stuffed.webp"
import img6 from "/kcal/Shallow.webp"
import img7 from "/kcal/Pot.webp"
import img8 from "/kcal/Spaghetti.webp"
import img9 from "/kcal/Hamburger.webp"



export const firstTagFilter = [
    { info: "فطور الصباح", icon: coffe },
    { info: "غداء", icon: ShallowPan },
    { info: "عشاء", icon: PotOfFood },
    { info: "لمجة", icon: Chestnut },
    { info: "سلاطة", icon: GreenSalad },
    { info: "شوربة", icon: BowlWithSpoon },
    { info: "ديسار", icon: Cupcake },
]

export const secondTagFilter = [
    { info: "بالخضرة", icon: Broccoli },
    { info: "بالحم", icon: CutOfMeat },
    { info: "بالحوت", icon: TropicalFish },
    { info: "بالعجينة", icon: Bread }
]

export const thirdTagFilter = [
    { info: "ساهلة", icon: OkHand },
    { info: "نهزها معايا", icon: Toolbox },
    { info: "شوية مكونات", icon: PinchingHand },
    { info: "من غير تطييب ", icon: Salad },
    { info: "فيسع فيسع", icon: Stopwatch },
    { info: "في الفور", icon: Pie },
]


export const fourthTagFilter = [
    { info: "قليل السعرات", icon: GreenApple },
    { info: "منخفض الدهون", icon: LeafyGreen },
    { info: "منخفض الكربوهيدرات", icon: Peanuts },
    { info: "غني بالبروتين", icon: Cooking },
    { info: "غني بالألياف", icon: Eggplant },
    { info: "بدون سكر", icon: sansSucre },
    { info: "بدون لاكتوز", icon: sansLactose },
    { info: "بدون غلوتين", icon: sansGluten },
    { info: "دي توكس", icon: Teacup },
    { info: "كيتو", icon: PoultryLeg },
    { info: "بيكستر", icon: Fish },
    { info: "نباتي", icon: CheeseWedge },
    { info: "نباتي صارم", icon: Shamrock },
]


export const dataKcal = [
    { info: "50-0", icon: img1 },
    { info: "100-50", icon: img2 },
    { info: "200-100", icon: img3 },
    { info: "300-200", icon: img4 },
    { info: "400-300", icon: img5 },
    { info: "500-400", icon: img6 },
    { info: "600-500", icon: img7 },
    { info: "700-600", icon: img8 },
    { info: "700 +", icon: img9 }
]