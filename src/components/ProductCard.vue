<template>
  <div class="card shadow-sm" style="width: 100%;  margin-bottom:3rem;">
    <img :src="product.img" class="card-img-top " alt="shoes" />
    <div class="w-75 m-auto">
      <hr />
    </div>
    <div class="card-body">
      <h5 class="card-title">{{ product.brand }} {{ product.catagory }}</h5>
      <p>
        {{ product.model }}
      </p>
      <p>
        <i
          class="fas fa-star"
          :class="['cbg-' + product.color]"
          v-for="item in product.stars[0]"
          :key="radioName + '_f_stars_' + item"
        >
        </i>
        <i
          class="fas fa-star-half-alt"
          :class="['cbg-' + product.color]"
          v-for="item in product.stars[1]"
          :key="radioName + '_h_stars_' + item"
        >
        </i>
        <i
          class="far fa-star"
          :class="['cbg-' + product.color]"
          v-for="item in product.stars[2]"
          :key="radioName + '_e_stars_' + item"
        >
        </i>
      </p>
      <h6 v-show="selectedSize != 0">
        <strong class="fs-4"> {{ selectedSize * 10 }} $</strong>
      </h6>
      <p class="card-text">
        {{ product.description }}
      </p>
      <div>
        <div :id="radioName">
          <div
            class="d-inline-block m-1"
            v-for="(item, index) in product.sizes"
            :key="index"
          >
            <input
              type="radio"
              :name="radioName"
              class="btn-check"
              :id="radioName + item"
              autocomplete="off"
              @click="setSize(item)"
            />
            <label class="btn btn-outline-primary" :for="radioName + item">{{
              item
            }}</label>
          </div>
        </div>
      </div>
      <div v-show="selectedSize != 0" class="">
        <button
          @click="addToBasket"
          type="button"
          class="btn btn-outline-primary my-4 mx-1"
        >
          Add To Basket
        </button>
        <div class="btn-group dropup">
          <button
            type="radio"
            class="btn btn-outline-primary dropdown-toggle mx-1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Quantity ({{ count }})
          </button>
          <ul class="dropdown-menu">
            <li v-for="i in 10" :key="i">
              <span class="dropdown-item" @click="setCount(i)"
                >{{ i }} - Price : ( {{ i * selectedSize * 10 }} $ )</span
              >
            </li>
          </ul>
        </div>
        <button class="btn btn-danger rounded mx-1" @click="resetSelect">
          X
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    radioName: String,
    product: Object,
    index: Number,
    sepeteEkle: Function,
  },
  data() {
    return {
      count: 0,
      fullStarCounts: 0,
      halfStarCounts: 0,
      emptyStarCounts: 0,
      selectedSize: 0,
      bgColor: "",
    };
  },
  mounted() {
    // console.log(this.product.color);
  },
  methods: {
    addToBasket() {
      console.log(
        "sepete gidecek ürün adeti -> ",
        this.count,
        "seçilen ayak numarası -> ",
        this.selectedSize
      );
      document.getElementById(
        this.radioName + this.selectedSize
      ).checked = false;

      /* this.$emit("data", {
        model: this.product.model,
        size: this.selectedSize,
        cnt: this.count,
      }); */
      this.sepeteEkle({
        model: this.product.model,
        size: this.selectedSize,
        cnt: this.count,
      });

      this.selectedSize = 0;
      this.count = 0;
    },
    setSize(param) {
      /* Beden Seçimi */
      this.selectedSize = param;
      this.count = 1;
    },
    setCount(c) {
      /* Adet Seçimi */
      this.count = c;
    },
    resetSelect() {
      /* Radio Button Grubunun Reseti */
      document.getElementById(
        this.radioName + this.selectedSize
      ).checked = false;

      this.count = 0;
      this.selectedSize = 0;
    },
  },
};
</script>

<style lang="css">
/* root a değişken atayamadım ,sanırım işe yaramıyor */
/* 
:root {
  --clr: "#" + this.product.color;
} */

.cbg-black-pink {
  color: #9b7082;
  /* color: var(--clr); */
}
.cbg-pink {
  color: #e2c4d8;
}
.cbg-gray {
  color: #909096;
}
.cbg-indigo {
  color: #3f4170;
}
.cbg-black {
  color: #687939;
}
.cbg-soft-blue {
  color: #1e5474;
}
</style>
