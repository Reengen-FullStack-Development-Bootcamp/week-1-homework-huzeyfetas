<template>
  <header class="p-4  border-bottom bg-light">
    <div class="container">
      <div
        class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start"
      >
        <a href="#" class="text-dark text-decoration-none">
          Nike Shoes Shop
        </a>

        <div v-show="cnt > 0" class="dropdown text-end ms-auto">
          <a
            href="#"
            class="d-block link-dark text-decoration-none dropdown-toggle  position-relative"
            id="basket"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="fas fa-shopping-basket">
              <!-- TODO : ADET SAYISI EKLE SPAN İÇİNDE -->
            </i>
            <span
              class="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger"
              >{{ cnt }}</span
            >
          </a>
          <ul
            class="dropdown-menu text-small p-1 shadow-sm"
            aria-labelledby="basket"
          >
            <li v-for="(item, index) in basket" :key="index">
              <div class="row m-3 p-2 border shadow-sm" style="width:600px; ">
                <div class="col-12">{{ item.model }}</div>
                <div class="col-12 my-1">
                  Size
                  <span class="badge rounded-pill bg-warning text-dark  me-4">
                    {{ item.size }}</span
                  >
                  Quantity
                  <span class="badge rounded-pill bg-warning text-dark ">
                    {{ item.cnt }}</span
                  >
                </div>
                <div class="row my-2">
                  <div class="col-2 text-center">
                    <button
                      class="w-100 btn btn-light"
                      @click.stop="doOperation('delete', index)"
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                  </div>
                  <div class="col-2 text-center">
                    <button
                      class="w-100 btn btn-success"
                      @click.stop="doOperation('add', index)"
                    >
                      <i class="fas fa-plus"></i>
                    </button>
                  </div>
                  <div class="col-5 text-center">
                    Price
                    <span class="btn bg-warning text-dark fs-6 me-4">
                      {{ item.size * item.cnt * 10 }} $
                    </span>
                  </div>
                  <div class="col-3 text-center">
                    <button
                      class="w-100 btn btn-light"
                      @click.stop="doOperation('reset', index)"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div class="float-end my-3 me-3">
                Total Price
                <span class="badge bg-primary fs-5">{{ totalPrice }} $</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    cnt: Number,
    totalPrice: Number,
    basket: Array,
    fAdd: Function,
    fDel: Function,
    fReset: Function,
  },
  data() {
    return {};
  },
  mounted() {
    // console.log(this.basket);
  },
  methods: {
    doOperation(op, index) {
      if (op === "add") {
        this.fAdd(index);
      } else if (op === "delete") {
        this.fDel(index);
      } else {
        this.fReset(index);
      }
    },
  },
  watch: {
    basket: function(sepet) {
      console.count("Basket değişti", sepet);
    },
  },
};
</script>

<style lang="css"></style>
