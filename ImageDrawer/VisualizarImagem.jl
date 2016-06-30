#visualiza as propriedades de uma imagem

using ImageView, Images
img = load("../imgt.png")


#pegando um pedaço da imagem - SUBIMAGEM!!!!!!!!!! aeeeeeewwwww


#imgnew = subim(img, "x", 1:500, "y",1:500)


#funciona da seguinte forma: o segundo e quarto params (1:500 e 500:1000) é o intervalo de corte nas coordenadas x e y

#exemplo imagem 1000x1000

imgnew = subim(img, "x", 1:500, "y", 500:1000)




#Here's an example of adding a scale bar to an image:
# imgc = image canvas...
# imsl =
#imgc, imsl = ImageView.view(img)
length = 3000
#ImageView.scalebar(imgc, imsl, length; x = 0.1, y = 0.05)




#desenhar imagem com proporção da escala (com aspect ratio)
#view(img, pixelspacing = [1,1])
ImageView.view(imgnew, pixelspacing = [1,1])



#desenhar imagem sem proporção de escala (sem aspect ratio)
#view(img)
