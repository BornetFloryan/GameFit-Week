export const transformIntToString = {
    created() {
        this.transformProps(this.$props);
    },
    methods: {
        transformProps(props) {
            for (let key in props) {
                if (Object.hasOwn(props, key)) {
                    if (typeof props[key] === 'number') {
                        this.$set(props, key, props[key].toString());
                    }
                }
            }
        }
    },
    watch: {
        $props: {
            handler(newProps) {
                this.transformProps(newProps);
            },
            deep: true
        }
    }
};