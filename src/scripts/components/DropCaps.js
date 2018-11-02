// el should be what wraps all <p>'s... then DropCaps get's the first letter of the first <p>

class DropCaps {
	constructor(el) {
		this.$el = $(el)

		if (this.$el.length > 0) {
			const $p = this.$el.find('p').first()
			if ($p.length > 0) {
				const pFirstLetterRemoved = $p.text().substr(1, undefined)
				const firstLetter = `<span class="first-letter">${$p.text().slice(0,1)}</span>`
				$p.html(`${firstLetter}${pFirstLetterRemoved}`)
			}
		}
	}
}
