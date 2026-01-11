class Filter {
    constructor(page, size) {
        this.page = page;
        this.size = size;
        this.genre = null;
        this.type = null;
        this.minRating = null;
        this.minYear = null;
        this.maxYear = null;
        this.containsInTitle = null;
        this.sortRating = null;
        this.sortYear = null;
        this.sortPopularity = null;
    }

    setGenre(genre) {
        this.genre = genre;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setMinRating(minRating) {
        this.minRating = minRating;
        return this;
    }

    setMinYear(minYear) {
        this.minYear = minYear;
        return this;
    }

    setMaxYear(maxYear) {
        this.maxYear = maxYear;
        return this;
    }

    setContainsInTitle(containsInTitle) {
        this.containsInTitle = containsInTitle;
        return this;
    }
    
    isSortRating(sortRating) {
        this.sortRating = sortRating;
        return this;
    }

    isSortYear(sortYear) {
        this.sortYear = sortYear;
        return this;
    }


    isSortPopularity(sortPopularity) {
        this.sortPopularity = sortPopularity;
        return this;
    }

    build() {
        return this;
    }
}

export default Filter;