// Utility functions for Bengali number conversion

const bengaliNumerals = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]

export function toBengaliNumber(num: number | string): string {
  return String(num)
    .split("")
    .map((char) => {
      const digit = Number.parseInt(char, 10)
      return isNaN(digit) ? char : bengaliNumerals[digit]
    })
    .join("")
}

export const bengaliMonths = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
]

export const bengaliWeekdays = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"]

export const bengaliWeekdaysShort = ["র", "সো", "ম", "বু", "বৃ", "শু", "শ"]
