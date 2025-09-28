import { test } from '@playwright/test'

export const GIVEN = (title, fn) => test.step(`GIVEN: ${title}`, fn)
export const WHEN = (title, fn) => test.step(`WHEN: ${title}`, fn)
export const THEN = (title, fn) => test.step(`THEN: ${title}`, fn)
