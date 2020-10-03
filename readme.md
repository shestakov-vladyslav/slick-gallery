# my-slick-gallery
Demo
----
https://vladshestakov.github.io/slick-gallery/

Installation
----

1. Add assets to your page

```sh
<script src="https://cdn.jsdelivr.net/npm/my-slick-gallery@1.1.0/slick-gallery.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/my-slick-gallery@1.1.0/slick-gallery.min.css">
```

2. Add a "slick-gallery" class to slick element.

```sh
<div class="my-slick slick-gallery">
    <div><img src="images/1.jpg" alt=""></div>
    <div><img src="images/2.jpg" alt=""></div>
    <div><img src="images/3.jpg" alt=""></div>
    <div><img src="images/4.jpg" alt=""></div>
    <div><img src="images/5.jpg" alt=""></div>
    <div><img src="images/6.jpg" alt=""></div>
</div>
```

3. That's all! Enjoy your full-screen gallery.

![Screenshot](https://telegra.ph/file/bd4c7dbe2f4440c792a1f.png)

Customize
----
Example scss styles to adapt the appearance to your site.
```sh
$primary_color: #333;
$secondary_color: #eee;

div.slick-box{
    &__arrow{ /* Arrow background */
        background: $secondary_color;

        svg line{ /* Arrow color */
            stroke: $primary_color;
        }

        &--next,
        &--prev{ /* Arrow border */
            border-right: 4px solid $primary_color;
        }
    }
    
    &__preview{ /* Preview box background color */
        background: $primary_color;
    }

    &__close{ /* Close button background */
        background: $primary_color;
    }
}
```

License
----

MIT