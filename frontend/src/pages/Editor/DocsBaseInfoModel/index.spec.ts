/**
 * @vitest-environment jsdom
 */

import DocsBaseInfoModel from "./index";
import { describe, it, expect } from "vitest";
describe("DocsBaseInfoModel", () => {
  
        it("コンストラクタの値渡しを確認", () => {
            
            // * Arrange
            // なし

            // * Act
            const result = new DocsBaseInfoModel({docsName:"apple",docsVersion:"banana",docsId:"orange"});

            // * Assert
            expect(result.docsName).toEqual("apple");
            expect(result.docsVersion).toEqual("banana");
            expect(result.docsId).toEqual("orange");
        });
        it("initの値渡しを確認", () => {
            
            // * Arrange
            const docsBaseInfoModel = new DocsBaseInfoModel({docsName:"apple",docsVersion:"banana",docsId:"orange"});

            // * Act
            docsBaseInfoModel.init({docsName:"grape",docsVersion:"melon",docsId:"peach"});

            // * Assert
            expect(docsBaseInfoModel.docsName).toEqual("grape");
            expect(docsBaseInfoModel.docsVersion).toEqual("melon");
            expect(docsBaseInfoModel.docsId).toEqual("peach");

        });
        it("allUpdateの値渡しを確認", () => {
                
                // * Arrange
                const docsBaseInfoModel = new DocsBaseInfoModel({docsName:"apple",docsVersion:"banana",docsId:"orange"});
    
                // * Act
                docsBaseInfoModel.allUpdate({docsName:"grape",docsVersion:"melon",docsId:"peach"});
    
                // * Assert
                expect(docsBaseInfoModel.docsName).toEqual("grape");
                expect(docsBaseInfoModel.docsVersion).toEqual("melon");
                expect(docsBaseInfoModel.docsId).toEqual("peach");
            }
        );

});


