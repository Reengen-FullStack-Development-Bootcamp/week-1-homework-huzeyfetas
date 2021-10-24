<template>
  <div id="app">
    <Header
      :cnt="basketItemCount"
      :totalPrice="computeTotalPrice"
      :basket="basket"
      :fAdd="add"
      :fDel="del"
      :fReset="reset"
    />
    <div class="container my-5">
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="(product, index) in products"
          :key="index"
        >
          <!-- <ProductCard
            :product="product"
            :index="index"
            :radioName="'product' + index"
            @data="eklenen = $event"
          /> -->
          <ProductCard
            :product="product"
            :index="index"
            :radioName="'product' + index"
            :sepeteEkle="addToBasket"
          />
        </div>
      </div>
    </div>
    <div
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    ></div>
  </div>
</template>

<script>
import ProductCard from "./components/ProductCard.vue";
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    ProductCard,
    Header,
  },
  data() {
    return {
      urunSayisi: 0,
      totalPrice: 0,
      basket: [],
      categories: ["Women Shoes", "Man Shoes"],
      products: [
        {
          id: 1,
          brand: "Nike",
          model: `Nike Wmns Quest`,
          img: require("./assets/black-pink-shoes.jpg"),
          color: "black-pink",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consequat leo felis, quis tristique risus sollicitudin dictum. Pellentesque id lobortis quam. ",
          catagory: "Women Shoes",
          stars: [4, 0, 1],
          sizes: [34, 35, 40, 41, 43, 44],
        },
        {
          id: 2,
          brand: "Nike",
          model: `Nike Wmns Downshifter`,
          img: require("./assets/pink-shoes.jpg"),
          color: "pink",
          description:
            "Duis sed auctor risus, sed semper ex. Aenean tincidunt dui tellus, in egestas dolor laoreet ut. Donec eu nulla condimentum, iaculis dolor at, congue urna. ",
          catagory: "Women Shoes",
          stars: [4, 1, 0],
          sizes: [34, 35, 44, 45, 46],
        },
        {
          id: 3,
          brand: "Nike",
          model: `Nike Epic React Flykit`,
          img: require("./assets/gray-shoes.jpg"),
          color: "gray",
          description:
            "Aliquam malesuada, quam ut auctor vehicula, augue arcu malesuada ante, dignissim auctor dolor lorem id mauris. Nunc posuere imperdiet posuere.",
          catagory: "Man Shoes",
          stars: [5, 0, 0],
          sizes: [34, 35, 36, 46],
        },
        {
          id: 4,
          brand: "Nike",
          model: `Nike Venture Runner`,
          img: require("./assets/indigo-shoes.jpg"),
          color: "indigo",
          description:
            "Etiam volutpat libero nec libero vehicula porttitor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec a velit id leo interdum mollis.",
          catagory: "Man Shoes",
          stars: [3, 1, 1],
          sizes: [37, 38, 39, 44, 45],
        },
        {
          id: 5,
          brand: "Nike",
          model: `Nike Downshifter `,
          img: require("./assets/black-shoes.jpg"),
          color: "black",
          description:
            "Quisque ut ex enim. Nulla accumsan nec nisl id pulvinar. Aliquam scelerisque sit amet purus at scelerisque. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
          catagory: "Man Shoes",
          stars: [4, 0, 1],
          sizes: [35, 36, 39],
        },
        {
          id: 6,
          brand: "Nike",
          model: `Nike Flex Experience`,
          img: require("./assets/soft-blue-shoes.jpg"),
          color: "soft-blue",
          description:
            "Sed vitae ultricies nulla, nec pellentesque metus. Ut at aliquam orci. Donec imperdiet ligula vitae vulputate mattis. Donec sit amet elementum mauris, vel congue turpis. ",
          catagory: "Man Shoes",
          stars: [2, 1, 2],
          sizes: [37, 38, 39, 40, 41, 42, 43],
        },
      ],
    };
  },
  /*  mounted() {
    console.table(this.products);
  }, */
  methods: {
    randomSizeGenerator() {
      // TODO ürüne ait bedenler random oluşsun,
    },
    addToBasket(currentValue) {
      if (this.basket.length === 0) {
        this.basket.push(currentValue);
      } else {
        let isFound = false;
        this.basket.forEach((element) => {
          if (
            element.model === currentValue.model &&
            element.size === currentValue.size
          ) {
            isFound = true;
            element.cnt += currentValue.cnt;
          }
        });
        if (!isFound) {
          this.basket.push(currentValue);
        }
      }
      this.urunSayisi += currentValue.cnt;
      this.showToast("Success", `${currentValue.cnt} Adet Ürün Sepete Eklendi`);
    },
    showToast(head, content) {
      this.$dtoast.pop({
        preset: "success",
        heading: head,
        content: content,
      });
    },
    add(index) {
      this.basket[index].cnt += 1;
      this.urunSayisi++;
      this.showToast("Success", "Aynı Bedene Ait Yeni Bir Ürün Sepete Eklendi");
    },
    del(index) {
      if (this.basket[index].cnt >= 1) {
        this.basket[index].cnt -= 1;
        this.showToast("Success", "Ürun Silindi");
      } else {
        this.basket.splice(index, 1);
        this.basket[index].cnt -= 1;
        this.showToast("Success", "Ürun Silindi");
      }
      this.urunSayisi--;
    },
    reset(index) {
      let cnt = this.basket[index].cnt;
      let r = confirm(
        "Seçili Bedene Ait " + cnt + " Ürünü Silmek İstiyor Musunuz ?"
      );
      if (r) {
        this.urunSayisi -= cnt;
        this.basket.splice(index, 1);
        this.showToast("Success", "Seçili Bedene Ait Tüm Ürünler Silindi");
      }
    },
  },
  computed: {
    basketItemCount: function() {
      return this.urunSayisi;
    },
    computeTotalPrice: function() {
      let tot = 0;
      for (let index = 0; index < this.basket.length; index++) {
        const element = this.basket[index];
        tot += element.cnt * element.size * 10;
      }
      return tot;
    },
    computeBasket: function() {
      return "computeBasket";
    },
  },
  watch: {
    basket: function(currentBasket) {
      console.log("ürün eklendi, güncel sepet -> ", currentBasket);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
