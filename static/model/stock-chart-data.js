var stockChartData_i = [{ time: '2021-08-24', open: 484, high: 532, low: 465, close: 508 }, { time: '2021-08-25', open: 511, high: 528, low: 496, close: 517 }, { time: '2021-08-26', open: 511, high: 526, low: 483, close: 514 }, { time: '2021-08-27', open: 510, high: 535, low: 496, close: 496 }, { time: '2021-08-28', open: 495, high: 514, low: 486, close: 496 }, { time: '2021-08-29', open: 501, high: 514, low: 474, close: 505 }, { time: '2021-08-30', open: 511, high: 569, low: 503, close: 548 }, { time: '2021-08-31', open: 569, high: 575, low: 542, close: 552 }, { time: '2021-09-01', open: 541, high: 557, low: 518, close: 525 }, { time: '2021-09-02', open: 509, high: 521, low: 505, close: 494 }, { time: '2021-09-03', open: 479, high: 513, low: 467, close: 509 }, { time: '2021-09-04', open: 499, high: 516, low: 476, close: 502 }, { time: '2021-09-05', open: 528, high: 553, low: 487, close: 512 }, { time: '2021-09-06', open: 496, high: 516, low: 483, close: 495 }, { time: '2021-09-07', open: 480, high: 498, low: 463, close: 477 }]

var stockChartData_g = [{ time: '2021-09-08', open: 472, high: 488, low: 460, close: 457 }, { time: '2021-09-09', open: 475, high: 491, low: 475, close: 487 }, { time: '2021-09-10', open: 497, high: 515, low: 461, close: 495 }, { time: '2021-09-11', open: 498, high: 514, low: 480, close: 514 }, { time: '2021-09-12', open: 529, high: 536, low: 526, close: 534 }, { time: '2021-09-13', open: 544, high: 569, low: 530, close: 558 }, { time: '2021-09-14', open: 570, high: 609, low: 565, close: 589 }, { time: '2021-09-15', open: 611, high: 621, low: 601, close: 619 }, { time: '2021-09-16', open: 621, high: 623, low: 617, close: 620 }, { time: '2021-09-17', open: 601, high: 627, low: 579, close: 583 }, { time: '2021-09-18', open: 569, high: 601, low: 571, close: 575 }, { time: '2021-09-19', open: 600, high: 632, low: 593, close: 624 }, { time: '2021-09-20', open: 630, high: 633, low: 601, close: 616 }, { time: '2021-09-21', open: 597, high: 618, low: 574, close: 580 }, { time: '2021-09-22', open: 590, high: 610, low: 578, close: 594 }, { time: '2021-09-23', open: 576, high: 581, low: 554, close: 559 }, { time: '2021-09-24', open: 542, high: 556, low: 530, close: 526 }, { time: '2021-09-25', open: 510, high: 520, low: 493, close: 495 }, { time: '2021-09-26', open: 480, high: 498, low: 484, close: 465 }, { time: '2021-09-27', open: 451, high: 464, low: 437, close: 438 }, { time: '2021-09-28', open: 425, high: 434, low: 416, close: 412 }, { time: '2021-09-29', open: 407, high: 430, low: 402, close: 412 }, { time: '2021-09-30', open: 428, high: 469, low: 416, close: 450 }, { time: '2021-10-01', open: 470, high: 495, low: 437, close: 490 }, { time: '2021-10-02', open: 508, high: 526, low: 508, close: 523 }, { time: '2021-10-03', open: 542, high: 574, low: 535, close: 568 }, { time: '2021-10-04', open: 567, high: 568, low: 542, close: 550 }, { time: '2021-10-05', open: 577, high: 636, low: 558, close: 633 }, { time: '2021-10-06', open: 686, high: 759, low: 681, close: 761 }, { time: '2021-10-07', open: 765, high: 810, low: 740, close: 796 }, { time: '2021-10-08', open: 808, high: 839, low: 795, close: 820 }, { time: '2021-10-09', open: 810, high: 895, low: 791, close: 881 }, { time: '2021-10-10', open: 911, high: 982, low: 878, close: 972 }, { time: '2021-10-11', open: 946, high: 1060, low: 913, close: 1015 }, { time: '2021-10-12', open: 1034, high: 1104, low: 990, close: 1052 }, { time: '2021-10-13', open: 1036, high: 1093, low: 988, close: 1062 }, { time: '2021-10-14', open: 1082, high: 1158, low: 1031, close: 1110 }, { time: '2021-10-15', open: 1076, high: 1081, low: 1032, close: 1044 }, { time: '2021-10-16', open: 1013, high: 1026, low: 1008, close: 982 }, { time: '2021-10-17', open: 1039, high: 1076, low: 1010, close: 1067 }, { time: '2021-10-18', open: 1113, high: 1138, low: 1045, close: 1124 }, { time: '2021-10-19', open: 1218, high: 1295, low: 1204, close: 1241 }, { time: '2021-10-20', open: 1204, high: 1262, low: 1162, close: 1187 }, { time: '2021-10-21', open: 1151, high: 1188, low: 1113, close: 1117 }, { time: '2021-10-22', open: 1284, high: 1306, low: 1212, close: 1246 }, { time: '2021-10-23', open: 1208, high: 1237, low: 1164, close: 1172 }, { time: '2021-10-24', open: 1137, high: 1175, low: 1135, close: 1103 }, { time: '2021-10-25', open: 1070, high: 1121, low: 1027, close: 1038 }, { time: '2021-10-26', open: 1007, high: 1056, low: 1002, close: 976 }, { time: '2021-10-27', open: 961, high: 984, low: 923, close: 932 }, { time: '2021-10-28', open: 916, high: 930, low: 902, close: 889 }, { time: '2021-10-29', open: 862, high: 869, low: 831, close: 836 }, { time: '2021-10-30', open: 811, high: 825, low: 799, close: 787 }, { time: '2021-10-31', open: 763, high: 782, low: 734, close: 740 }, { time: '2021-11-01', open: 718, high: 720, low: 727, close: 697 }, { time: '2021-11-02', open: 676, high: 687, low: 652, close: 655 }, { time: '2021-11-03', open: 636, high: 649, low: 646, close: 636 }, { time: '2021-11-04', open: 634, high: 670, low: 598, close: 648 }, { time: '2021-11-05', open: 663, high: 704, low: 619, close: 685 }, { time: '2021-11-06', open: 705, high: 743, low: 701, close: 743 }, { time: '2021-11-07', open: 762, high: 793, low: 722, close: 773 }, { time: '2021-11-08', open: 766, high: 769, low: 738, close: 743 }, { time: '2021-11-09', open: 744, high: 774, low: 719, close: 721 }, { time: '2021-11-10', open: 700, high: 702, low: 674, close: 679 }, { time: '2021-11-11', open: 711, high: 750, low: 682, close: 728 }, { time: '2021-11-12', open: 710, high: 750, low: 699, close: 748 }, { time: '2021-11-13', open: 760, high: 760, low: 716, close: 737 }, { time: '2021-11-14', open: 715, high: 721, low: 692, close: 693 }, { time: '2021-11-15', open: 672, high: 690, low: 657, close: 652 }, { time: '2021-11-16', open: 671, high: 696, low: 622, close: 651 }, { time: '2021-11-17', open: 632, high: 660, low: 611, close: 613 }, { time: '2021-11-18', open: 639, high: 700, low: 629, close: 674 }, { time: '2021-11-19', open: 704, high: 723, low: 645, close: 683 }, { time: '2021-11-20', open: 663, high: 685, low: 642, close: 643 }, { time: '2021-11-21', open: 624, high: 640, low: 625, close: 619 }, { time: '2021-11-22', open: 682, high: 700, low: 649, close: 662 }, { time: '2021-11-23', open: 642, high: 672, low: 600, close: 670 }, { time: '2021-11-24', open: 650, high: 682, low: 645, close: 667 }, { time: '2021-11-25', open: 661, high: 663, low: 636, close: 651 }, { time: '2021-11-26', open: 679, high: 700, low: 646, close: 693 }, { time: '2021-11-27', open: 672, high: 701, low: 630, close: 678 }, { time: '2021-11-28', open: 687, high: 709, low: 665, close: 666 }, { time: '2021-11-29', open: 646, high: 655, low: 630, close: 627 }, { time: '2021-11-30', open: 618, high: 634, low: 593, close: 599 }, { time: '2021-12-01', open: 604, high: 633, low: 591, close: 594 }]