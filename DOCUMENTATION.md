# fortune-wheel

## Документация

_Блок_ - массив, содержащий все варианты значений барабана

### Алгоритм работы барабана

После загрузки данных с сервера, в стейт барабана загружается один блок для отображения превью.

После нажатия на кнопку "Мне повезёт", высчитывается количество недостающих блоков для прокрутки (_insufficientCount_)  
путём деления высоты одного блока на величину прокрутки (_DISTANCE_), которая, в свою очередь, вычисляется путём  
умножения скорости (_SPEED_), времени (_TIME_) и высоты строки (_LINE_HEIGHT_).

Для определения видимых значений после окончания прокрутки, используется кастомный хук useIsVisible, реализованный  
с помощью IntersectionObserver. Положение выбранного элемента определяется переменной _WIN_ITEM_NUM_.

"Случайность" осуществляется путём опционально доступной сортировки загруженных данных, а также изменения переменных  
скорости и времени.

Решение далеко от оптимального варианта, который может содержать всего 2 блока в независимости от размера данных.  
В этом случае "бесконечность" прокрутки будет осуществляться путём переноса положения скролла и замены мест  
блоков.
