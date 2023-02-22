# Ejercicio Lógica

Este ejercicio tiene como objetivo demostrar mis capacidades en el analisis y resolución de problemas.

Por medio del comando "ts-node script.ts" se ejecutan los comando dentro del archivo typescript, en donde se realiza la lectura del archivo “time_series_covid19_deaths_US.csv” y se da respuesta a las siguientes preguntas:
1. Estado con mayor acumulado a la fecha.
2. Estado con menor acumulado a la fecha.
3. El porcentaje de muertes vs el total de población por estado.
4. ¿Cuál fue el estado más afectado?.

Se obtuvo como resultado lo siguiente:

![image](https://user-images.githubusercontent.com/75145982/220509332-9ce51f96-fb16-42d7-b708-073fb11c8e56.png)
![image](https://user-images.githubusercontent.com/75145982/220509569-cd8ddf26-a531-44b7-ba8f-435232c4b19a.png)

Los datos fueron agrupados por estado y luego ordenados por la cantidad de muertes para dar las respuestas 1 y 2. En la respuesta número 3 se calculó el porcentaje de muertes como la tasa de mortalidad por cada 1000 habitantes, este valor fue impreso junto con la cantidad de población. La tasa de mortalidad de obtuvo de la formula:

$$\textrm{TM} = {\textrm{Total de muertes} \over \textrm{Total población}} * 1000$$

La tasa de mortalidad más alta nos da respuesta a la pregunta 4: ¿Cuál fue el estado más afectado?. Es decir, la cantidad de muertos más representativa con respecto a su población total.
