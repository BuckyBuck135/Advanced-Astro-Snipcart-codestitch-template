# Changelog

## 0.2.2
### Minor changes
- Fixed an issue where images in cart product description would 404. This was caused by the Product component sending the whole image object instead of image.src to the cart <img> element.
```diff
- <Product as="span" id={product.id} image={image} >
+ <Product as="span" id={product.id} image={image.src} >
```

- Fixed an issue where the checkout modal would not render properly when on a sign-in or sign-up page

## 0.2.1
Beta version
### Major changes
- Added documentation
- Project is now using local images for products rather than remote


## 0.1.0
- Initial release of alpha version

