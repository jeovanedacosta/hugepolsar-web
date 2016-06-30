#Pkg.status()
#Pkg.add("Images")
#Pkg.add("ImageMagick")
#Pkg.add("StatsBase")
#Pkg.add("ImageView")
#Pkg.update()
#VERSION
#println(JULIA_HOME)

#using Images, ImageView

include("ZoomScript.jl")

ZoomScript.view("Images/SanAnd_05508_10007_005_100114_L090HHHH_CX_01.mlc",
                "Images/SanAnd_05508_10007_005_100114_L090HVHV_CX_01.mlc",
                "Images/SanAnd_05508_10007_005_100114_L090VVVV_CX_01.mlc",10)


#para executar o código temos que abrir o terminal
#cd até a pasta do código (Source)
#digitar include("ZoomScript.jl")
#digitar ZoomScript.view("Images/SanAnd_05508_10007_005_100114_L090HHHH_CX_01.mlc","Images/SanAnd_05508_10007_005_100114_L090HVHV_CX_01.mlc","Images/SanAnd_05508_10007_005_100114_L090VVVV_CX_01.mlc",10)
